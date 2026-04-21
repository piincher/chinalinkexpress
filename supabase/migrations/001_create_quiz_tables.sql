-- ============================================
-- Import Quiz Feature - Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Quiz Submissions Table
-- Stores all quiz submissions with results
-- ============================================
CREATE TABLE quiz_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Contact Information
  whatsapp_number TEXT NOT NULL,
  
  -- Quiz Data
  answers JSONB NOT NULL DEFAULT '{}',
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  category TEXT NOT NULL CHECK (category IN ('hot', 'warm', 'cold')),
  
  -- Guide Access
  guide_token TEXT NOT NULL UNIQUE,
  guide_opened BOOLEAN DEFAULT FALSE,
  guide_opened_at TIMESTAMPTZ,
  
  -- Follow-up Tracking
  follow_up_sent BOOLEAN DEFAULT FALSE,
  follow_up_sent_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_whatsapp CHECK (whatsapp_number ~ '^\d{8,15}$')
);

-- Indexes for performance
CREATE INDEX idx_quiz_submissions_whatsapp ON quiz_submissions(whatsapp_number);
CREATE INDEX idx_quiz_submissions_category ON quiz_submissions(category);
CREATE INDEX idx_quiz_submissions_created_at ON quiz_submissions(created_at DESC);
CREATE INDEX idx_quiz_submissions_guide_token ON quiz_submissions(guide_token);
CREATE INDEX idx_quiz_submissions_guide_opened ON quiz_submissions(guide_opened) WHERE guide_opened = FALSE;

-- ============================================
-- Guide Access Logs Table
-- Tracks when guides are accessed for analytics
-- ============================================
CREATE TABLE guide_access_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guide_token TEXT NOT NULL REFERENCES quiz_submissions(guide_token) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  accessed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_guide_access_logs_token ON guide_access_logs(guide_token);
CREATE INDEX idx_guide_access_logs_accessed_at ON guide_access_logs(accessed_at DESC);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on tables
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_access_logs ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write quiz submissions
CREATE POLICY "Service role only" ON quiz_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role only" ON guide_access_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Functions
-- ============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_quiz_submissions_updated_at
  BEFORE UPDATE ON quiz_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to mark guide as opened
CREATE OR REPLACE FUNCTION mark_guide_opened(p_token TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE quiz_submissions
  SET guide_opened = TRUE,
      guide_opened_at = NOW()
  WHERE guide_token = p_token
    AND guide_opened = FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get submissions needing follow-up
CREATE OR REPLACE FUNCTION get_pending_follow_ups(p_hours INTEGER DEFAULT 24)
RETURNS TABLE (
  id UUID,
  whatsapp_number TEXT,
  score INTEGER,
  category TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qs.id,
    qs.whatsapp_number,
    qs.score,
    qs.category,
    qs.created_at
  FROM quiz_submissions qs
  WHERE qs.created_at < NOW() - INTERVAL '1 hour' * p_hours
    AND qs.guide_opened = FALSE
    AND qs.follow_up_sent = FALSE
  ORDER BY qs.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Views for Analytics
-- ============================================

CREATE VIEW quiz_analytics AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE category = 'hot') as hot_leads,
  COUNT(*) FILTER (WHERE category = 'warm') as warm_leads,
  COUNT(*) FILTER (WHERE category = 'cold') as cold_leads,
  AVG(score)::INTEGER as average_score,
  COUNT(*) FILTER (WHERE guide_opened) as guides_opened,
  ROUND(100.0 * COUNT(*) FILTER (WHERE guide_opened) / NULLIF(COUNT(*), 0), 2) as open_rate
FROM quiz_submissions
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- Comments for documentation
-- ============================================

COMMENT ON TABLE quiz_submissions IS 'Stores all import readiness quiz submissions';
COMMENT ON COLUMN quiz_submissions.whatsapp_number IS 'User WhatsApp number in E.164 format without +';
COMMENT ON COLUMN quiz_submissions.answers IS 'JSON object with question_id: answer_value pairs';
COMMENT ON COLUMN quiz_submissions.score IS 'Total score from 0-100';
COMMENT ON COLUMN quiz_submissions.category IS 'Lead qualification: hot (80+), warm (50-79), cold (<50)';
COMMENT ON COLUMN quiz_submissions.guide_token IS 'Unique token for accessing the personalized guide';
COMMENT ON COLUMN quiz_submissions.guide_opened IS 'Whether user has opened their guide';
COMMENT ON COLUMN quiz_submissions.follow_up_sent IS 'Whether follow-up WhatsApp was sent';

COMMENT ON TABLE guide_access_logs IS 'Tracks access to personalized guides for analytics';

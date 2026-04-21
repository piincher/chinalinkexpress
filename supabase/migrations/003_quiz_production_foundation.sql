-- ============================================
-- Import Quiz Production Foundation
-- Adds attribution, diagnostic scoring, event analytics, lead profiles,
-- and WhatsApp message lifecycle tracking.
-- ============================================

ALTER TABLE quiz_submissions
ADD COLUMN IF NOT EXISTS session_id TEXT,
ADD COLUMN IF NOT EXISTS quiz_version TEXT NOT NULL DEFAULT 'import-readiness-v1',
ADD COLUMN IF NOT EXISTS attribution JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS dimensions JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS recommendation JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS lead_priority INTEGER CHECK (lead_priority IS NULL OR (lead_priority >= 0 AND lead_priority <= 100)),
ADD COLUMN IF NOT EXISTS lead_stage TEXT NOT NULL DEFAULT 'new',
ADD COLUMN IF NOT EXISTS ip_address INET,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

CREATE INDEX IF NOT EXISTS idx_quiz_submissions_session_id ON quiz_submissions(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_locale ON quiz_submissions(locale);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_lead_priority ON quiz_submissions(lead_priority DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_lead_stage ON quiz_submissions(lead_stage);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_attribution_source ON quiz_submissions((attribution->>'source'));

-- ============================================
-- Quiz Events
-- Funnel analytics: view, start, answers, submit, guide CTA.
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL CHECK (
    event_name IN (
      'quiz_viewed',
      'quiz_started',
      'question_answered',
      'question_previous',
      'whatsapp_step_viewed',
      'quiz_submitted',
      'quiz_submit_failed',
      'guide_opened',
      'guide_cta_clicked'
    )
  ),
  locale TEXT NOT NULL DEFAULT 'fr' CHECK (locale IN ('fr', 'en', 'zh', 'ar')),
  question_id INTEGER,
  answer_value TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  attribution JSONB NOT NULL DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_events_session_id ON quiz_events(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_events_event_name ON quiz_events(event_name);
CREATE INDEX IF NOT EXISTS idx_quiz_events_created_at ON quiz_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_events_question_id ON quiz_events(question_id) WHERE question_id IS NOT NULL;

ALTER TABLE quiz_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only" ON quiz_events;
CREATE POLICY "Service role only" ON quiz_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Lead Profiles
-- CRM-ready lead summary for operations/sales.
-- ============================================
CREATE TABLE IF NOT EXISTS lead_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES quiz_submissions(id) ON DELETE CASCADE,
  whatsapp_number TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  category TEXT NOT NULL CHECK (category IN ('hot', 'warm', 'cold')),
  lead_priority INTEGER NOT NULL CHECK (lead_priority >= 0 AND lead_priority <= 100),
  primary_service TEXT NOT NULL,
  shipping_mode TEXT NOT NULL,
  next_action TEXT NOT NULL,
  priority_reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  assigned_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_profiles_submission_id ON lead_profiles(submission_id);
CREATE INDEX IF NOT EXISTS idx_lead_profiles_status ON lead_profiles(status);
CREATE INDEX IF NOT EXISTS idx_lead_profiles_priority ON lead_profiles(lead_priority DESC);
CREATE INDEX IF NOT EXISTS idx_lead_profiles_whatsapp ON lead_profiles(whatsapp_number);

ALTER TABLE lead_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only" ON lead_profiles;
CREATE POLICY "Service role only" ON lead_profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP TRIGGER IF EXISTS update_lead_profiles_updated_at ON lead_profiles;
CREATE TRIGGER update_lead_profiles_updated_at
  BEFORE UPDATE ON lead_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Message Events
-- Tracks WhatsApp send/delivery/failure lifecycle.
-- ============================================
CREATE TABLE IF NOT EXISTS message_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_token TEXT,
  message_type TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'wasender',
  status TEXT NOT NULL,
  recipient TEXT NOT NULL,
  provider_message_id TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_message_events_submission_token ON message_events(submission_token);
CREATE INDEX IF NOT EXISTS idx_message_events_status ON message_events(status);
CREATE INDEX IF NOT EXISTS idx_message_events_created_at ON message_events(created_at DESC);

ALTER TABLE message_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only" ON message_events;
CREATE POLICY "Service role only" ON message_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Analytics Views
-- ============================================
CREATE OR REPLACE VIEW quiz_funnel_analytics AS
SELECT
  DATE(created_at) AS date,
  COUNT(*) FILTER (WHERE event_name = 'quiz_viewed') AS views,
  COUNT(*) FILTER (WHERE event_name = 'quiz_started') AS starts,
  COUNT(*) FILTER (WHERE event_name = 'whatsapp_step_viewed') AS whatsapp_step_views,
  COUNT(*) FILTER (WHERE event_name = 'quiz_submitted') AS submissions,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE event_name = 'quiz_started') /
    NULLIF(COUNT(*) FILTER (WHERE event_name = 'quiz_viewed'), 0),
    2
  ) AS start_rate,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE event_name = 'quiz_submitted') /
    NULLIF(COUNT(*) FILTER (WHERE event_name = 'quiz_started'), 0),
    2
  ) AS submit_rate
FROM quiz_events
GROUP BY DATE(created_at)
ORDER BY date DESC;

CREATE OR REPLACE VIEW quiz_lead_quality AS
SELECT
  DATE(created_at) AS date,
  COUNT(*) AS total_submissions,
  COUNT(*) FILTER (WHERE category = 'hot') AS hot_leads,
  COUNT(*) FILTER (WHERE category = 'warm') AS warm_leads,
  COUNT(*) FILTER (WHERE category = 'cold') AS cold_leads,
  AVG(score)::INTEGER AS average_score,
  AVG(lead_priority)::INTEGER AS average_lead_priority,
  COUNT(*) FILTER (WHERE guide_opened) AS guides_opened,
  ROUND(100.0 * COUNT(*) FILTER (WHERE guide_opened) / NULLIF(COUNT(*), 0), 2) AS guide_open_rate
FROM quiz_submissions
GROUP BY DATE(created_at)
ORDER BY date DESC;

COMMENT ON TABLE quiz_events IS 'Append-only analytics events for the import readiness quiz funnel';
COMMENT ON TABLE lead_profiles IS 'CRM-ready lead summaries generated from quiz submissions';
COMMENT ON TABLE message_events IS 'WhatsApp and lifecycle message send/read/failure events';

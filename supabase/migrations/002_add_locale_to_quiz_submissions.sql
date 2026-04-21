-- ============================================-- Add locale column to quiz_submissions-- ============================================

-- Add locale column with default 'fr' (French)
ALTER TABLE quiz_submissions
ADD COLUMN locale TEXT DEFAULT 'fr' CHECK (locale IN ('fr', 'en', 'zh', 'ar'));

-- Update existing rows to have 'fr' as locale
UPDATE quiz_submissions SET locale = 'fr' WHERE locale IS NULL;

-- Make locale NOT NULL after setting default
ALTER TABLE quiz_submissions
ALTER COLUMN locale SET NOT NULL;

-- Add comment
COMMENT ON COLUMN quiz_submissions.locale IS 'User preferred language locale (fr, en, zh, ar)';

-- Update the get_pending_follow_ups function to include locale
CREATE OR REPLACE FUNCTION get_pending_follow_ups(p_hours INTEGER DEFAULT 24)
RETURNS TABLE (
  id UUID,
  whatsapp_number TEXT,
  score INTEGER,
  category TEXT,
  locale TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qs.id,
    qs.whatsapp_number,
    qs.score,
    qs.category,
    qs.locale,
    qs.created_at
  FROM quiz_submissions qs
  WHERE qs.created_at < NOW() - INTERVAL '1 hour' * p_hours
    AND qs.guide_opened = FALSE
    AND qs.follow_up_sent = FALSE
  ORDER BY qs.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

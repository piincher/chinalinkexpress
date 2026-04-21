# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note down the project URL and anon key

## 2. Run Migrations

### Option A: Using Supabase Dashboard (SQL Editor)

1. Go to SQL Editor in your Supabase dashboard
2. Copy contents of `supabase/migrations/001_create_quiz_tables.sql`
3. Run the SQL

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## 3. Get Environment Variables

Go to Project Settings → API and copy:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 4. Update .env.local

```bash
cp .env.local.example .env.local
# Edit with your values
```

## 5. Test Connection

```bash
npm run dev
# Visit http://localhost:3000/api/health (create this route to test)
```

## Database Schema Overview

### quiz_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| whatsapp_number | TEXT | User's WhatsApp |
| answers | JSONB | Quiz answers |
| score | INTEGER | 0-100 |
| category | TEXT | hot/warm/cold |
| guide_token | TEXT | Unique access token |
| guide_opened | BOOLEAN | Track if viewed |
| created_at | TIMESTAMP | Submission time |

### guide_access_logs
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| guide_token | TEXT | FK to quiz_submissions |
| ip_address | INET | Visitor IP |
| accessed_at | TIMESTAMP | Access time |

## Security

- RLS enabled - only service role can access data
- Guide tokens are unique and random
- Phone numbers validated before storage
- All access is logged

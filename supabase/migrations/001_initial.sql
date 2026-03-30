-- Mateusz OS — Initial Schema
-- Run this in your Supabase SQL Editor

-- ─── Workouts ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  duration_minutes INTEGER,
  notes TEXT,
  source TEXT NOT NULL DEFAULT 'whatsapp' CHECK (source IN ('whatsapp', 'dashboard'))
);

CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sets JSONB NOT NULL DEFAULT '[]', -- [{weight: 135, reps: 5, form: "good"}, ...]
  muscle_groups TEXT[] DEFAULT '{}',
  notes TEXT
);

-- ─── Body Stats ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS body_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  weight_lbs DECIMAL(5,1),
  measurements JSONB, -- {chest: 42, waist: 34, arms: 15, neck: 16, hips: 38}
  photo_url TEXT,
  notes TEXT
);

-- ─── Meals / Food Log ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description TEXT NOT NULL,
  meal_type TEXT NOT NULL DEFAULT 'snack' CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  calories_est INTEGER,
  protein_est INTEGER,
  carbs_est INTEGER,
  fat_est INTEGER,
  location TEXT DEFAULT 'home', -- 'home' | restaurant name | 'delivery: DoorDash' etc
  photo_url TEXT,
  source TEXT NOT NULL DEFAULT 'whatsapp' CHECK (source IN ('whatsapp', 'dashboard', 'photo'))
);

-- ─── Finance: Transactions ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'investment', 'transfer')),
  account TEXT DEFAULT 'checking',
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'plaid', 'whatsapp'))
);

-- ─── Finance: Income Streams ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS income_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('primary', 'secondary')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'exploring', 'paused', 'complete')),
  target_monthly DECIMAL(10,2),
  current_monthly DECIMAL(10,2) DEFAULT 0,
  started_at DATE DEFAULT CURRENT_DATE,
  notes TEXT
);

-- ─── Habits (for Garden view) ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', '3x_week', 'weekly')),
  category TEXT NOT NULL CHECK (category IN ('fitness', 'finance', 'mindset', 'growth')),
  plant_type TEXT NOT NULL DEFAULT 'bamboo' CHECK (plant_type IN ('bamboo', 'lotus', 'vine', 'oak', 'cherry'))
);

CREATE TABLE IF NOT EXISTS habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  quality INTEGER CHECK (quality BETWEEN 1 AND 5)
);

-- ─── Grocery Lists ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS grocery_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'suggested' CHECK (status IN ('suggested', 'approved', 'ordered', 'delivered')),
  items JSONB NOT NULL DEFAULT '[]', -- [{name, quantity, category, estimated_price}]
  store TEXT CHECK (store IN ('instacart', 'heb')),
  order_id TEXT -- external order ID from Instacart/HEB
);

-- ─── WhatsApp Message Log ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS wa_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  body TEXT NOT NULL,
  media_url TEXT,
  intent TEXT,
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  twilio_sid TEXT
);

-- ─── Seed Default Habits ──────────────────────────────────────────────────────

INSERT INTO habits (name, description, frequency, category, plant_type) VALUES
  ('Strength Training', '3 sessions per week: compound lifts', '3x_week', 'fitness', 'bamboo'),
  ('Finance Review', 'Log all transactions, review spend', 'daily', 'finance', 'oak'),
  ('No Phone Morning', 'First 60 min of day: no phone', 'daily', 'mindset', 'lotus'),
  ('Income Building', 'Work on second income stream', '3x_week', 'growth', 'vine')
ON CONFLICT DO NOTHING;

-- ─── Seed Default Income Streams ──────────────────────────────────────────────

INSERT INTO income_streams (name, type, status, target_monthly) VALUES
  ('Primary Job', 'primary', 'active', NULL),
  ('Independence Project', 'secondary', 'exploring', 2000)
ON CONFLICT DO NOTHING;

-- ─── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_workouts_logged_at ON workouts(logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_body_stats_logged_at ON body_stats(logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_meals_logged_at ON meals(logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_habit_logs_habit_id ON habit_logs(habit_id);
CREATE INDEX IF NOT EXISTS idx_habit_logs_logged_at ON habit_logs(logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_wa_messages_received_at ON wa_messages(received_at DESC);

-- Ensure Tables Exist (Idempotent)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT,
    readings_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active_date DATE,
    streak_days INT DEFAULT 0
);

-- Ensure Columns Exist (if table already existed)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'last_active_date') THEN
        ALTER TABLE users ADD COLUMN last_active_date DATE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'streak_days') THEN
        ALTER TABLE users ADD COLUMN streak_days INT DEFAULT 0;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    input_text TEXT,
    fortune_level TEXT,
    advice_json JSONB,
    lucky_item TEXT,
    god_name TEXT,
    god_image_url TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure Columns for readings (just in case)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'readings' AND column_name = 'is_paid') THEN
        ALTER TABLE readings ADD COLUMN is_paid BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS zazen_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    course_id TEXT,
    duration_seconds INT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS goshuin_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    design_id TEXT
);

CREATE TABLE IF NOT EXISTS ema_offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    content TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE zazen_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE goshuin_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ema_offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE zazen_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE goshuin_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ema_offerings ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Readings Table Policies
CREATE POLICY "Users can view own readings" ON readings FOR SELECT USING (auth.uid() = user_id);
-- INSERT is restricted to RPC for public use, but we allow authenticated users to insert for now to avoid breaking legacy clients instantly, though plan is to move to RPC.
-- If we want strict security, we disable direct INSERT for readings and force RPC.
-- Let's keep it restrictive: No Direct Insert.
-- CREATE POLICY "Users can insert own readings" ON readings FOR INSERT WITH CHECK (auth.uid() = user_id); 

-- Zazen Sessions Table Policies
CREATE POLICY "Users can view own zazen sessions" ON zazen_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own zazen sessions" ON zazen_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Goshuin Entries Table Policies
CREATE POLICY "Users can view own goshuin" ON goshuin_entries FOR SELECT USING (auth.uid() = user_id);
-- Insert is handled by service logic, usually client-side now, so allow insert.
CREATE POLICY "Users can insert own goshuin" ON goshuin_entries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ema Offerings Table Policies
CREATE POLICY "Public can view public emas" ON ema_offerings FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view own emas" ON ema_offerings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own emas" ON ema_offerings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RPC: Perform Reading (Transaction)
CREATE OR REPLACE FUNCTION perform_reading(
    p_input_text TEXT,
    p_fortune_level TEXT,
    p_advice_json JSONB,
    p_lucky_item TEXT,
    p_god_name TEXT,
    p_god_image_url TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_reading_id UUID;
    v_new_count INT;
BEGIN
    -- Get current user ID
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    -- 1. Insert Reading
    INSERT INTO readings (
        user_id,
        input_text,
        fortune_level,
        advice_json,
        lucky_item,
        god_name,
        god_image_url,
        is_paid
    ) VALUES (
        v_user_id,
        p_input_text,
        p_fortune_level,
        p_advice_json,
        p_lucky_item,
        p_god_name,
        p_god_image_url,
        FALSE
    ) RETURNING id INTO v_reading_id;

    -- 2. Increment User Reading Count & Update Activity
    UPDATE users
    SET 
        readings_count = readings_count + 1,
        last_active_date = CURRENT_DATE
    WHERE id = v_user_id
    RETURNING readings_count INTO v_new_count;

    -- Return result
    RETURN jsonb_build_object(
        'reading_id', v_reading_id,
        'new_count', v_new_count
    );
END;
$$;

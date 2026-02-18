-- Add payment columns to readings table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'readings' AND column_name = 'amount_paid') THEN
        ALTER TABLE readings ADD COLUMN amount_paid DECIMAL(10, 2) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'readings' AND column_name = 'currency') THEN
        ALTER TABLE readings ADD COLUMN currency TEXT DEFAULT 'USD';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'readings' AND column_name = 'stripe_session_id') THEN
        ALTER TABLE readings ADD COLUMN stripe_session_id TEXT;
    END IF;
END $$;

-- Update perform_reading RPC to include payment details
CREATE OR REPLACE FUNCTION perform_reading(
    p_input_text TEXT,
    p_fortune_level TEXT,
    p_advice_json JSONB,
    p_lucky_item TEXT,
    p_god_name TEXT,
    p_god_image_url TEXT DEFAULT NULL,
    p_is_paid BOOLEAN DEFAULT FALSE,
    p_amount_paid DECIMAL DEFAULT 0,
    p_currency TEXT DEFAULT 'USD',
    p_stripe_session_id TEXT DEFAULT NULL
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
        is_paid,
        amount_paid,
        currency,
        stripe_session_id
    ) VALUES (
        v_user_id,
        p_input_text,
        p_fortune_level,
        p_advice_json,
        p_lucky_item,
        p_god_name,
        p_god_image_url,
        p_is_paid,
        p_amount_paid,
        p_currency,
        p_stripe_session_id
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

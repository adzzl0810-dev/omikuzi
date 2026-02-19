-- Create User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL UNIQUE, -- One entry per user for simplicity
    credits INT DEFAULT 0 CHECK (credits >= 0),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own credits" ON user_credits
    FOR SELECT USING (auth.uid() = user_id);

-- Only system (via Webhook/RPC) should modify credits usually, but for now we might need to allow system role bypass or specific function.
-- Security Definer functions will handle updates.

-- RPC: Redeem Credit (Transactional)
-- Checks if user has credit, decrements 1, returns true if successful.
CREATE OR REPLACE FUNCTION redeem_credit()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_credits INT;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Lock the row for update
    SELECT credits INTO v_credits FROM user_credits WHERE user_id = v_user_id FOR UPDATE;

    IF v_credits > 0 THEN
        UPDATE user_credits SET credits = credits - 1, updated_at = NOW() WHERE user_id = v_user_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$;

-- RPC: Add Credit (For Stripe Webhook - strictly secure this later or keep it as internal/service_role only)
-- Ideally this is called by the Edge Function using service_role key, bypassing RLS.
-- But for SQL safety, let's have a helper.
CREATE OR REPLACE FUNCTION add_credit(p_user_id UUID, p_amount INT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO user_credits (user_id, credits)
    VALUES (p_user_id, p_amount)
    ON CONFLICT (user_id)
    DO UPDATE SET credits = user_credits.credits + p_amount, updated_at = NOW();
END;
$$;

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // 1. Check User Auth
        const {
            data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) {
            return new Response("Unauthorized", { status: 401, headers: corsHeaders })
        }

        // 2. Redeem Credit (Transactional)
        // We strictly use the RPC to Ensure ACID compliance (check + decrement)
        const { data: success, error: creditError } = await supabaseClient.rpc('redeem_credit')

        if (creditError || !success) {
            return new Response(JSON.stringify({ error: "Insufficient Credits" }), {
                status: 402,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        // 3. Generate Fortune (AI)
        // We already deducted credit, so we MUST deliver or refund (complicated).
        // For now, we try hard to deliver.
        const apiKey = Deno.env.get('GOOGLE_API_KEY')
        if (!apiKey) throw new Error("Missing Google API Key")

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const { input } = await req.json()
        const prompt = `
      You are a "Digital Shrine Maiden" (Miko) or a Spirit Guide in the Digital Sanctuary.
      A user has come to you with the following worry or thought: "${input}".
      
      Generate a unique "Omikuji" (fortune) for them.
      The tone should be "Mystical, Serene, yet Modern" (Digital Shinto vibe).
      
      **CRITICAL**: The output must be readable for overseas people (English main).
      **CRITICAL**: ALL fields (fortune, god_name, advice values, lucky_item) MUST be in English.
      **CRITICAL**: The "god_name" must be an "Anthropomorphized Yaoyorozu no Kami" (Personified natural phenomenon or concept) with an English title.

      Return ONLY a valid JSON object with the following structure:
      {
        "fortune": "String (e.g. 'DAIKICHI (Great Blessing)', 'KYO (Curse)', 'CHUKICHI (Middle Blessing)')",
        "god_name": "String (A creative English name for a Personified Deity, e.g. 'Goddess of Cleansing Rain', 'Spirit Guardian of New Beginnings')",
        "waka": {
          "text": "String (A mystical short poem/haiku in Japanese - for atmosphere)",
          "meaning": "String (English translation/interpretation of the poem - this is what they will read)"
        },
        "advice": {
          "wish": "String (English advice on their wish/desire)",
          "waiting_person": "String (English advice on waiting person)",
          "lost_item": "String (English advice on lost things)",
          "travel": "String (English advice on travel)",
          "business": "String (English advice on business)",
          "studies": "String (English advice on studies)",
          "love": "String (English advice on relationships)",
          "moving": "String (English advice on moving)",
          "illness": "String (English advice on health)",
          "proposal": "String (English advice on marriage)"
        },
        "lucky_item": "String (A modern or traditional item in English, e.g. 'Crystal Bead', 'Old Smartphone')"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const fortuneData = JSON.parse(cleanedText);

        // 4. Save to Database (Securely via Service Role or RPC)
        // We can use the same RPC 'perform_reading' but server-side.
        // However, 'perform_reading' checks auth.uid(). Since we have the user context in 'supabaseClient', it should work.
        // But let's be explicit and safe.
        // actually, let's just insert directly using the authorized client.
        // RLS "Users can insert own readings" is DISABLED/COMMENTED OUT in 001_security_hardening.
        // So we need to use 'perform_reading' RPC which is SECURITY DEFINER.

        // NOTE: 'perform_reading' takes 'is_paid'. We set it to TRUE because we just redeemed a credit.
        const { data: readingData, error: dbError } = await supabaseClient.rpc('perform_reading', {
            p_input_text: input,
            p_fortune_level: fortuneData.fortune,
            p_advice_json: fortuneData,
            p_lucky_item: fortuneData.lucky_item,
            p_god_name: fortuneData.god_name,
            p_god_image_url: null,
            p_is_paid: true,
            p_amount_paid: 1.00, // Or fetch actual amount from credit metadata if we had it
            p_currency: 'USD',
            p_stripe_session_id: 'credit_redemption'
        });

        if (dbError) {
            console.error("DB Save Error after credit deduction:", dbError)
            // Critical error: Credit taken but reading failed to save.
            // Ideally should refund credit here.
            // await supabaseClient.rpc('add_credit', { p_user_id: user.id, p_amount: 1 })
            return new Response(JSON.stringify({ error: "Failed to save reading", details: dbError }), { status: 500, headers: corsHeaders })
        }

        return new Response(JSON.stringify(readingData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (err: any) {
        console.error(err)
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})

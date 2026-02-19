import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";
// Import Stripe Deno library or use raw fetch if package not available in Deno Land easily
// Utilizing a common CDN for stripe
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

console.log("Stripe Webhook Function Initialized");

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2022-11-15",
    httpClient: Stripe.createFetchHttpClient(),
});
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    const signature = req.headers.get("stripe-signature");

    if (!signature || !endpointSecret || !supabaseUrl || !supabaseServiceKey) {
        console.error("Missing config or signature");
        return new Response("Configuration Error", { status: 500 });
    }

    let event;
    try {
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Initialize Supabase Admin Client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.client_reference_id; // Setup Stripe Link to pass this!

        // Fallback: Check metadata if client_reference_id is missing
        const metadataUserId = session.metadata?.user_id;
        const targetUserId = userId || metadataUserId;

        if (targetUserId) {
            console.log(`Processing payment for user: ${targetUserId}`);

            // Call the DB function to add credit
            const { error } = await supabase.rpc("add_credit", {
                p_user_id: targetUserId,
                p_amount: 1 // Default to 1 fortune per payment for now
            });

            if (error) {
                console.error("Failed to add credit:", error);
                return new Response("Database Error", { status: 500 });
            }

            console.log(`Successfully added credit to ${targetUserId}`);
        } else {
            console.warn("No user_id found in session");
        }
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" },
    });
});

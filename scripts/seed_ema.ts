import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SEED_WISHES = [
    "World Peace & Inner Calm in this chaotic digital age.",
    "Health and prosperity for my family this year. May the spirits guide us.",
    "Finding clarity in chaos. Hoping to successfully launch my dream project.",
    "Hoping my cat recovers from her illness. She's my only family in the city.",
    "Praying to pass the bar exam next week. I've given everything to this.",
    "To finally find someone who understands my soul. 10 years of loneliness is enough."
];

async function seed() {
    console.log("🌱 Starting Ema Wall Seeding (Anonymous)...");

    // 2. Insert Ema Offerings
    for (const content of SEED_WISHES) {
        console.log(`Inserting: "${content.substring(0, 30)}..."`);
        const { error: insertError } = await supabase
            .from('ema_offerings')
            .insert({
                content: content,
                is_public: true,
                likes_count: Math.floor(Math.random() * 20) + 1, // Add some fake likes
                created_at: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString() // Random time in last 3 days
            });

        if (insertError) {
            console.error("Failed to insert Ema:", insertError.message);
        } else {
            console.log("✅ Inserted");
        }
    }

    console.log("🌸 Seeding completed successfully!");
}

seed();

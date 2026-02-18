import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("Missing VITE_GOOGLE_API_KEY");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// ... imports ...

export interface OmikujiResult {
  fortune: string; // e.g. "Daikichi (Great Blessing)"
  waka: {
    text: string; // The poem in Japanese
    meaning: string; // English explanation
  };
  advice: {
    wish: string; // Negai
    waiting_person: string; // Machibito
    lost_item: string; // Uselmono
    travel: string; // Tabidachi
    business: string; // Akinai
    studies: string; // Gakumon
    love: string; // Renai
    moving: string; // Yautsuria
    illness: string; // Byoki
    proposal: string; // Engidan
  };
  lucky_item: string;
  god_name: string;
  god_prompt: string;
}

export const generateFortune = async (userInput: string): Promise<OmikujiResult> => {
  // Using gemini-2.0-flash as it is available for this key
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    You are a "Digital Shrine Maiden" (Miko) or a Spirit Guide in the Digital Sanctuary.
    A user has come to you with the following worry or thought: "${userInput}".
    
    Generate a unique "Omikuji" (fortune) for them.
    The tone should be "Mystical, Serene, yet Modern" (Digital Shinto vibe).
    
    **CRITICAL**: The output must be readable for overseas people (English main).
    **CRITICAL**: The "God" must be an "Anthropomorphized Yaoyorozu no Kami" (Personified natural phenomenon or concept).

    Return ONLY a valid JSON object with the following structure:
    {
      "fortune": "String (e.g., 'DAIKICHI (Great Blessing)', 'KYO (Curse)', 'CHUKICHI (Middle Blessing)')",
      "god_name": "String (A creative name for a Personified Deity based on their worry, e.g., 'Goddess of Cleansing Rain', 'Spirit Guardian of New Beginnings')",
      "waka": {
        "text": "String (A mystical short poem/haiku in Japanese)",
        "meaning": "String (English translation/interpretation of the poem)"
      },
      "advice": {
        "wish": "String (Advice on their wish/desire)",
        "waiting_person": "String (Will the person they wait for come?)",
        "lost_item": "String (Where to look for lost things)",
        "travel": "String (Is it safe to travel?)",
        "business": "String (Profit or loss?)",
        "studies": "String (Success or failure?)",
        "love": "String (Advice on relationships)",
        "moving": "String (Good or bad to move?)",
        "illness": "String (Recovery or caution needed?)",
        "proposal": "String (Marriage/Partnership advice)"
      },
      "lucky_item": "String (A modern or traditional item, e.g., 'Crystal Bead', 'Old Smartphone', 'White Handkerchief')",
      "god_prompt": "String (A highly detailed image generation prompt for this Anthropomorphized God. Keywords: 'Anime style', 'Divine Character Design', 'Gijinka', 'Japanese Deity', 'Kimono with digital patterns', 'Glowing halo'. Describe the character's gender, appearance, clothing, and divine aura based on the god_name.)"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown code blocks
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanedText) as OmikujiResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("The Oracle is offline. Please try again.");
  }
};

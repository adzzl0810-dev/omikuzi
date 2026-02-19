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
    **CRITICAL**: ALL fields (fortune, god_name, advice values, lucky_item) MUST be in English.
    **CRITICAL**: The "god_name" must be an "Anthropomorphized Yaoyorozu no Kami" (Personified natural phenomenon or concept) with an English title.

    Return ONLY a valid JSON object with the following structure:
    {
      "fortune": "String (e.g., 'DAIKICHI (Great Blessing)', 'KYO (Curse)', 'CHUKICHI (Middle Blessing)')",
      "god_name": "String (A creative English name for a Personified Deity, e.g., 'Goddess of Cleansing Rain', 'Spirit Guardian of New Beginnings')",
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
      "lucky_item": "String (A modern or traditional item in English, e.g., 'Crystal Bead', 'Old Smartphone')"
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

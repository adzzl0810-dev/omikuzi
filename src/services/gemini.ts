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
    housing: string; // Yautsuria (renamed from moving)
    health: string; // Byoki (renamed from illness)
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
    The tone should be "Mystical, Serene, Traditional yet Modern" (Digital Shinto vibe).
    The advice should be specific, profound, and helpful, not generic.
    
    **CRITICAL**: The output must be readable for overseas people (English main).
    **CRITICAL**: ALL fields (fortune, god_name, advice values, lucky_item) MUST be in English.
    **CRITICAL**: The "god_name" must be an "Anthropomorphized Yaoyorozu no Kami" (Personified natural phenomenon or concept) with an English title.

    Return ONLY a valid JSON object with the following structure:
    {
      "fortune": "String (e.g. 'DAIKICHI (Great Blessing)', 'UKICHI (Blessing)', 'KICHI (Good Fortune)', 'SHOKICHI (Small Blessing)', 'SUEKICHI (Future Blessing)', 'KYO (Curse)')",
      "god_name": "String (A creative English name for a Personified Deity, e.g. 'Goddess of Cleansing Rain', 'Spirit Guardian of New Beginnings')",
      "waka": {
        "text": "String (A mystical short poem/haiku in Japanese - for atmosphere)",
        "meaning": "String (A poetic English interpretation of the poem. It should sound like ancient wisdom.)"
      },
      "advice": {
        "wish": "String (Wishes / Negai-goto: Advice on whether the wish will come true. e.g. 'It will come true if you remain patient.')",
        "love": "String (Love / Ren-ai: Advice on love and relationships. e.g. 'Do not rush. The right person is near.')",
        "waiting_person": "String (Waiting Person / Machibito: Advice on someone you are waiting for or a destined meeting. e.g. 'They will come late.')",
        "business": "String (Business / Akinai: Advice on work, business, or profit. e.g. 'Do not seek immediate gain.')",
        "studies": "String (Studies / Gakumon: Advice on learning and exams. e.g. 'Focus on the basics.')",
        "health": "String (Health / Byoki: Advice on health and recovery. e.g. 'Recovery may be slow but certain.')",
        "housing": "String (Housing & Moving / Yautsuria: Advice on moving or home improvement. e.g. 'West is a good direction.')",
        "travel": "String (Travel / Tabidachi: Advice on trips or new journeys. e.g. 'A sudden trip brings good luck.')",
        "proposal": "String (Marriage Proposal / Engidan: Advice on marriage. e.g. 'Proceed with a sincere heart.')",
        "lost_item": "String (Lost Items / Usemono: Advice on finding lost things. e.g. 'It will be found in a low place.')"
      },
      "lucky_item": "String (A modern or traditional item in English, e.g. 'Crystal Bead', 'Old Smartphone')"
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

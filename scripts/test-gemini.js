import 'dotenv/config';
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
    console.error("Error: GOOGLE_API_KEY environment variable is not set.");
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            const contentModels = data.models
                .filter(m => m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name);
            console.log("Models supporting generateContent:", JSON.stringify(contentModels, null, 2));
        } else {
            console.log("No models found or error:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error fetching models:", error);
    }
}

listModels();

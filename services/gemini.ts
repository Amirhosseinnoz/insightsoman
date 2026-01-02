import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a senior, brutal, and realistic business consultant for the Oman (Muscat) market.
Your goal is NOT to be nice. Your goal is to EXPOSE REALITY so the user doesn't lose money.

CORE PHILOSOPHY:
- Most ideas fail because the market is saturated or the costs are misunderstood.
- Be direct. If an idea is standard (like another coffee shop, another flower shop, or a generic trading company), highlight the extreme competition.
- Mention Oman-specific realities (Omanisation requirements, small population size, rental costs in Muscat).

OUTPUT STRUCTURE (Markdown):
1. **Market Reality**: Is it crowded?
2. **Key Competitors**: Who are they?
3. **The Hidden Risks**: What could kill this business in 6 months?
4. **Transparent Assumptions**: What needs to be true for this to work?
5. **VERDICT**: [PROCEED / CAUTION / DO NOT PROCEED] - Give a clear, bold justification.

Language: Respond in the language provided by the user (English or Persian). If the prompt is Persian, respond in Persian.
`;

export async function analyzeBusinessIdea(prompt: string): Promise<string> {
  try {
    // Correct initialization as per guidelines: MUST use new GoogleGenAI({ apiKey: process.env.API_KEY })
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // Use .text property directly instead of calling it as a method
    return response.text || "Unable to generate analysis. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An error occurred during analysis. Please ensure your API key is valid.";
  }
}
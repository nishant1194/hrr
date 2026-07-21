import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing. Please add it to your .env.local file."
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Incoming Request:", body);

    const {
      theme = "",
      tone = "",
      audience = "",
      customMessage = "",
    } = body;

    const prompt = `
You are an HR communication assistant.

Generate a WhatsApp-ready morning motivational message for office employees.

Details:
- Theme: ${theme}
- Tone: ${tone}
- Audience: ${audience}

Additional Context:
${customMessage || "None"}

Writing Style:
- Start with exactly:

Good Morning Team,

- Then write 10-15 words motivational sentences.
- Use simple English.
- Keep the total message under 10-15 words (excluding "Good Morning Team,").
- Suitable for an office WhatsApp group.
- Warm, positive and professional.
- End with exactly ONE or TWO positive emojis.

Allowed emojis:
✨ 😊 💫 🌟 💪 🙌 🌞 🌱 🍀 🎯 👏 🤝

Rules:
- No quotation marks.
- No hashtags.
- No bullet points.
- Don't mention AI.
- Return ONLY the final message.

Example:

Good Morning Team,

Start the day with positivity and confidence.
Every small effort leads to big success. ✨
`;

    console.log("Calling Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Gemini Response:", response);

    return NextResponse.json({
      quote: response.text ?? "",
    });
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}
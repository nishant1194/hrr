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
You are an experienced HR Communication Specialist who writes engaging morning motivational messages for employees.

Your task is to generate a fresh, inspiring, and WhatsApp-ready morning message that HR teams can share with employees.

## Inputs

Theme: ${theme}
Tone: ${tone}
Audience: ${audience}

Additional Instructions:
${customMessage?.trim() || "None"}

## Requirements

- Begin with exactly:

Good Morning Team,

- After the greeting, write 2–3 short sentences.
- Use simple, natural English that everyone can understand.
- Keep the message concise (30–50 words).
- The message should feel human-written, not AI-generated.
- Encourage positivity, teamwork, confidence, growth, or productivity depending on the selected theme.
- Adapt the writing style according to the selected tone.
- Consider the audience while writing.
- If additional instructions are provided, naturally incorporate them.
- Make every response unique. Avoid repeating common phrases or templates.
- End with exactly one or two relevant positive emojis.

## Style Guidelines

The message should be:
- Professional
- Warm
- Motivational
- Positive
- Easy to read
- Suitable for an office WhatsApp group

## Avoid

- Quotation marks
- Bullet points
- Numbered lists
- Hashtags
- Overly dramatic language
- Mentioning AI
- Generic clichés like "Believe in yourself" unless they are rewritten naturally

## Example 1

Good Morning Team,

Every new day brings fresh opportunities to learn and grow.
Let's stay focused, support one another, and make today productive. 🌟

## Example 2

Good Morning Team,

Success is built through consistent effort and teamwork.
Let's approach today's challenges with confidence and a positive mindset. 🚀

## Example 3

Good Morning Team,

Small improvements made every day lead to remarkable results over time.
Let's give our best and enjoy the journey. ✨

Return ONLY the final message.
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
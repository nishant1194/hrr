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
You are an experienced HR Communication Specialist.

Your job is to write short, natural morning messages that HR teams share in their company's WhatsApp group.

## Inputs

Theme: ${theme}
Tone: ${tone}
Audience: ${audience}

Additional Instructions:
${customMessage?.trim() || "None"}

## Writing Style

Write exactly like the examples below.

The messages should feel:
- Short
- Natural
- Positive
- Professional
- Human-written
- Easy to read
- Suitable for an office WhatsApp group

Do NOT sound like a motivational speaker or AI chatbot.

## Format

Always begin with exactly:

Good Morning Team,

Then write 1–2 short motivational lines.

End with exactly one or two positive emojis.

## Examples

Good Morning Team,

Strong teams build stronger results. ✨

---

Good Morning Team,

Hard work opens doors.
Consistency keeps them open. ✨

---

Good Morning Team,

Effort never goes unnoticed.
It always creates value. 😇

---

Good Morning Team,

Great teamwork accelerates success. 😊

---

Good Morning Team,

Every morning is a new opportunity to learn, grow, and succeed. 🌞

---

Good Morning Team,

Great things are done by a series of small things brought together. 🤝

---

Good Morning Team,

Keep pushing forward and stay motivated! 🚀

## Guidelines

- Use the selected theme naturally.
- Adapt the tone based on the selected tone.
- Consider the audience while writing.
- If additional instructions are provided, naturally include them.
- Every response should be different.
- Do not repeat the examples verbatim.
- Do not use quotation marks.
- Do not use hashtags.
- Do not use bullet points.
- Do not mention AI.
- Return only the final message.
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
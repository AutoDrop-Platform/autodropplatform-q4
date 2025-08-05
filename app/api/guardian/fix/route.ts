// app/api/guardian/fix/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // ضيف المفتاح في .env.local أو Vercel
});

/**
 * Input JSON:
 * {
 *   "code": "string - محتوى الملف",
 *   "filename": "string - اسم/مسار الملف (اختياري)",
 *   "goal": "string - الهدف المطلوب من التصحيح (اختياري)"
 * }
 *
 * Output JSON:
 * {
 *   "fixedCode": "string",
 *   "englishNotes": "string",
 *   "arabicNotes": "string",
 *   "raw": any // الرد الخام من OpenAI (للدبتج فقط)
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const { code, filename, goal } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing 'code' in body." },
        { status: 400 }
      );
    }

    // <<< بدّل هذا بالـ Prompt ID اللي ظهر لك في OpenAI >>>
    const PROMPT_ID = "pmpt_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // <-- عدّل هنا
    const PROMPT_VERSION = "1";

    // نطلب من البوت يرجّع لنا JSON منظّم
    const userPayload = {
      task: "fix_code",
      language: "en", // خلي التصحيح والشروحات الأساسية إنجليزي
      explainInArabic: true, // ويرجع لك ملخص بالعربي بعد التصحيح
      filename: filename ?? null,
      goal:
        goal ??
        "Fix errors, apply TypeScript/ESLint best practices, and keep behavior.",
      requiredOutputSchema: {
        type: "object",
        properties: {
          fixedCode: { type: "string" },
          englishNotes: { type: "string" },
          arabicNotes: { type: "string" },
        },
        required: ["fixedCode", "englishNotes", "arabicNotes"],
        additionalProperties: true,
      },
      code,
    };

    // استدعاء الـ Prompt المنشور (حسب السنيبت اللي عطاك OpenAI)
    const response = await openai.responses.create({
      prompt: { id: PROMPT_ID, version: PROMPT_VERSION },
      // نمرّر الداتا للبرومبت كـ input
      input: [
        {
          role: "user",
          content: [
            { type: "text", text: JSON.stringify(userPayload) },
          ],
        },
      ],
    });

    // نحاول استخراج JSON من الرد
    let fixedCode = "";
    let englishNotes = "";
    let arabicNotes = "";

    // بعض الإصدارات ترجع النص في هذا المسار:
    const text =
      (response as any)?.output?.[0]?.content?.[0]?.text ??
      (response as any)?.output_text ??
      "";

    try {
      const parsed = JSON.parse(text);
      fixedCode = parsed.fixedCode ?? "";
      englishNotes = parsed.englishNotes ?? "";
      arabicNotes = parsed.arabicNotes ?? "";
    } catch {
      // لو ما قدر يبارس، نرجّع النص كامل في englishNotes
      englishNotes = text || "Model returned non-JSON text.";
    }

    return NextResponse.json({
      fixedCode,
      englishNotes,
      arabicNotes,
      raw: response, // مفيد للدبتج – احذفه لو ما تحتاجه
    });
  } catch (err: any) {
    console.error("GuardianFix error:", err?.message || err);
    return NextResponse.json(
      { error: "GuardianFix failed.", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}

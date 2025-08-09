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
/**
 * معالجة طلب POST لتصحيح كود برمجي باستخدام OpenAI.
 *
 * @param req - طلب Next.js يحتوي على JSON فيه الكود والهدف والاسم (اختياري).
 * @returns JSON يحتوي على الكود المصحح، ملاحظات بالإنجليزية، ملاحظات بالعربية، والرد الخام من OpenAI.
 *
 * @remarks
 * - يجب تمرير مفتاح OpenAI في البيئة.
 * - إذا لم يكن الكود موجودًا أو ليس نصًا، يرجع خطأ 400.
 * - إذا فشل التصحيح أو حدث خطأ، يرجع خطأ 500 مع تفاصيل الخطأ.
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


    // تحقق من ضبط الـ Prompt ID بشكل صحيح
    const PROMPT_ID = "pmpt_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // <-- عدّل هنا
    const PROMPT_VERSION = "1";
    if (PROMPT_ID === "pmpt_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
      return NextResponse.json(
        { error: "لم يتم ضبط Prompt ID الخاص بـ OpenAI. يرجى تعديله في الكود قبل البناء." },
        { status: 500 }
      );
    }

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
            { type: "input_text", text: JSON.stringify(userPayload) },
          ],
        }
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

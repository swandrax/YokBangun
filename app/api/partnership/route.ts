import { NextResponse } from "next/server";
import { deliverSubmission } from "@/features/contact/deliver";
import { validatePartnership } from "@/features/contact/schema";
import { rateLimit, getClientIp } from "@/lib/security/rateLimit";
import { parseSafeJson } from "@/lib/security/bodyGuard";

export async function POST(request: Request) {
  // 1. Rate Limiting Guardrail (5 submissions per 10 minutes per IP)
  const clientIp = getClientIp(request);
  const limiter = rateLimit(`partnership:${clientIp}`, { maxRequests: 5, windowMs: 10 * 60 * 1000 });
  if (!limiter.success) {
    return NextResponse.json(
      { ok: false, error: "too_many_requests", message: "Terlalu banyak permintaan. Silakan coba beberapa saat lagi." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(limiter.resetMs / 1000).toString(),
        },
      }
    );
  }

  // 2. Safe Payload Body Guardrail (Max 64KB to prevent DoS)
  const bodyResult = await parseSafeJson(request);
  if (!bodyResult.ok) {
    const status = bodyResult.error === "payload_too_large" ? 413 : 400;
    return NextResponse.json({ ok: false, error: bodyResult.error }, { status });
  }

  const result = validatePartnership(bodyResult.data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  if (result.data.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const { website: _ignored, ...payload } = result.data;
  void _ignored;

  try {
    await deliverSubmission("partnership", process.env.PARTNERSHIP_WEBHOOK_URL, payload);
  } catch (error) {
    console.error("[partnership] delivery failed", error);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

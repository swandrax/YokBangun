import { NextResponse } from "next/server";
import { deliverSubmission } from "@/features/contact/deliver";
import { validatePartnership } from "@/features/contact/schema";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const result = validatePartnership(raw);
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

import "server-only";

/**
 * Forward a validated submission to an external receiver (CRM, email relay,
 * automation tool). Provider-neutral: a plain HTTPS POST.
 * When no webhook is configured, the submission is logged server-side only.
 */
export async function deliverSubmission(
  kind: "contact" | "partnership",
  webhookUrl: string | undefined,
  payload: Record<string, unknown>,
): Promise<{ delivered: boolean }> {
  const body = { kind, receivedAt: new Date().toISOString(), ...payload };

  if (!webhookUrl) {
    console.info(`[${kind}] submission received (no webhook configured)`, {
      organisation: payload.organisation,
      receivedAt: body.receivedAt,
    });
    return { delivered: false };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded with ${response.status}`);
  }
  return { delivered: true };
}

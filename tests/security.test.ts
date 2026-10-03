import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/security/rateLimit";
import { validateOutboundUrl } from "@/lib/security/ssrfGuard";
import { parseSafeJson } from "@/lib/security/bodyGuard";

describe("Security Guardrails", () => {
  describe("Rate Limiting", () => {
    it("allows requests up to the defined limit and blocks subsequent calls", () => {
      const id = "test-user-rate-limit";
      const config = { maxRequests: 3, windowMs: 10_000 };

      const r1 = rateLimit(id, config);
      expect(r1.success).toBe(true);
      expect(r1.remaining).toBe(2);

      const r2 = rateLimit(id, config);
      expect(r2.success).toBe(true);
      expect(r2.remaining).toBe(1);

      const r3 = rateLimit(id, config);
      expect(r3.success).toBe(true);
      expect(r3.remaining).toBe(0);

      // 4th request exceeds limit
      const r4 = rateLimit(id, config);
      expect(r4.success).toBe(false);
      expect(r4.remaining).toBe(0);
      expect(r4.resetMs).toBeGreaterThan(0);
    });
  });

  describe("SSRF Guard", () => {
    it("blocks cloud metadata service IP (169.254.169.254)", () => {
      const res = validateOutboundUrl("http://169.254.169.254/latest/meta-data/");
      expect(res.ok).toBe(false);
      if (!res.ok) {
        expect(res.error).toBe("blocked_hostname_or_metadata");
      }
    });

    it("blocks private subnet ranges", () => {
      const res = validateOutboundUrl("https://192.168.1.100/webhook");
      expect(res.ok).toBe(false);
      if (!res.ok) {
        expect(res.error).toBe("blocked_private_ip_range");
      }
    });

    it("allows valid public HTTPS webhook URLs", () => {
      const res = validateOutboundUrl("https://hooks.slack.com/services/T00/B00/X00");
      expect(res.ok).toBe(true);
      if (res.ok) {
        expect(res.url.hostname).toBe("hooks.slack.com");
      }
    });
  });

  describe("Body Guard (DoS Prevention)", () => {
    it("parses valid JSON within byte limit", async () => {
      const request = new Request("http://localhost/api/test", {
        method: "POST",
        body: JSON.stringify({ message: "hello" }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await parseSafeJson<{ message: string }>(request, 1024);
      expect(res.ok).toBe(true);
      if (res.ok) {
        expect(res.data.message).toBe("hello");
      }
    });

    it("rejects payload exceeding maxBytes", async () => {
      const largePayload = { text: "x".repeat(2000) };
      const request = new Request("http://localhost/api/test", {
        method: "POST",
        body: JSON.stringify(largePayload),
        headers: { "Content-Type": "application/json" },
      });
      const res = await parseSafeJson(request, 500); // 500 bytes max
      expect(res.ok).toBe(false);
      if (!res.ok) {
        expect(res.error).toBe("payload_too_large");
      }
    });
  });
});

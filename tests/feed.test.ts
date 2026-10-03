import { describe, expect, it } from "vitest";
import { GET } from "@/app/feed.xml/route";

describe("RSS feed route handler", () => {
  it("returns valid RSS 2.0 XML with appropriate headers", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("application/xml");

    const xml = await res.text();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<title>yokBangun — growth with u</title>");
    expect(xml).toContain("<item>");
    expect(xml).toContain("</item>");
    expect(xml).toContain("</rss>");
  });
});

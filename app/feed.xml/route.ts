import { NextResponse } from "next/server";
import { siteUrl, brand } from "@/lib/site";
import id from "@/messages/id";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const now = new Date().toUTCString();

  const items = [
    {
      title: "Layanan Produk Digital",
      link: `${siteUrl}/id/services#digital-products`,
      description: id.whatWeBuild.categories[0]?.description || "",
      pubDate: now,
      guid: `${siteUrl}/id/services#digital-products`,
    },
    {
      title: "Layanan AI untuk Kebutuhan Nyata Usaha",
      link: `${siteUrl}/id/ai-services`,
      description: id.ai.description || "",
      pubDate: now,
      guid: `${siteUrl}/id/ai-services`,
    },
    {
      title: "Product & Maintenance Services",
      link: `${siteUrl}/id/services#maintenance`,
      description: id.whatWeBuild.categories[2]?.description || "",
      pubDate: now,
      guid: `${siteUrl}/id/services#maintenance`,
    },
    {
      title: "Integrasi & Operasional Digital",
      link: `${siteUrl}/id/services#integration`,
      description: id.whatWeBuild.categories[3]?.description || "",
      pubDate: now,
      guid: `${siteUrl}/id/services#integration`,
    },
    {
      title: "Solusi Sektoral untuk UMKM, Koperasi, dan Komunitas",
      link: `${siteUrl}/id/sectors`,
      description: id.meta.pages.sectors.description || "",
      pubDate: now,
      guid: `${siteUrl}/id/sectors`,
    },
    {
      title: "Catatan Arsitektur & Teknologi yokBangun",
      link: `${siteUrl}/id/technical`,
      description: id.meta.pages.technical.description || "",
      pubDate: now,
      guid: `${siteUrl}/id/technical`,
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(brand.full)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(id.meta.siteDescription)}</description>
    <language>id-ID</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

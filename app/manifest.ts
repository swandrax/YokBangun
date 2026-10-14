import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "yokBangun — Solusi Digital & AI",
    short_name: "yokBangun",
    description:
      "yokBangun membangun produk digital, layanan AI, integrasi, dan maintenance untuk UMKM, usaha menengah, komunitas, serta kebutuhan sektoral.",
    start_url: "/?source=pwa",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#1F5D45",
    orientation: "portrait-primary",
    scope: "/",
    id: "/?source=pwa",
    related_applications: [
      {
        platform: "play",
        id: "id.yokbangun.app",
        url: "https://yok-bangun.vercel.app/download",
      },
    ],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Layanan",
        url: "/services",
        description: "Lihat 4 bidang layanan produk & maintenance yokBangun",
      },
      {
        name: "Layanan AI",
        url: "/ai-services",
        description: "Solusi asisten, automasi, dan pencarian dokumen berbasis AI",
      },
      {
        name: "Kontak",
        url: "/contact",
        description: "Hubungi atau diskusikan kebutuhan proyek Anda",
      },
    ],
    categories: ["business", "productivity", "utilities"],
    lang: "id",
    dir: "ltr",
  };
}

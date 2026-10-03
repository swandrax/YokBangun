import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

/**
 * Pass-through root layout. <html>/<body> are rendered by app/[locale]/layout.tsx
 * so the `lang` attribute matches the active locale on the server.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

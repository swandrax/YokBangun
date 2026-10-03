import type { ReactNode } from "react";

/**
 * Pass-through root layout. <html>/<body> are rendered by app/[locale]/layout.tsx
 * so the `lang` attribute matches the active locale on the server.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

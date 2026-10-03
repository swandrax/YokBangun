import Link from "next/link";
import "./globals.css";

/** Fallback for URLs outside any locale. Rendered without the locale layout, so it owns <html>. */
export default function GlobalNotFound() {
  return (
    <html lang="id">
      <body>
        <main className="section">
          <div className="container prose">
            <p className="eyebrow">404</p>
            <h1 style={{ fontSize: "var(--fs-h2)", marginTop: "1rem" }}>Halaman tidak ditemukan.</h1>
            <p className="lead" lang="en">
              Page not found.
            </p>
            <p style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/">Kembali ke beranda</Link>
              <Link href="/en" lang="en">
                Back to home
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}

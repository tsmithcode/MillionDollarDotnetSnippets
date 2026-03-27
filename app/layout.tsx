import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Million Dollar Dot Net Snippets",
  description:
    "Guided framework onboarding for consultants, architects, and technical leads who need high-leverage .NET delivery building blocks."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <div className="site-shell">
            <header className="site-header">
              <div className="brand-lockup">
                <div className="brand-mark" aria-hidden="true">
                  MDS
                </div>
                <div>
                  <p className="eyebrow">Million Dollar Dot Net Snippets</p>
                  <h1 className="brand-name">Framework Wizard</h1>
                </div>
              </div>
              <nav aria-label="Primary" className="site-nav">
                <a href="/">Wizard</a>
                <a href="/about">About</a>
                <a href="/proof">Proof</a>
                <a href="/leadership">Leadership</a>
                <a href="https://www.tsmithcode.ai">tsmithcode.ai</a>
              </nav>
            </header>
            <main id="content" tabIndex={-1}>
              {children}
            </main>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}

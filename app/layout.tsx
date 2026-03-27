import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SkipLink } from "@/components/ui/skip-link";
import { AnnouncementBanner } from "@/components/ui/announcement-banner";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <SkipLink />
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
                <a href="/town-hall">Town Hall</a>
                <a aria-label="tsmithcode.ai external" href="https://www.tsmithcode.ai" rel="noreferrer">
                  tsmithcode.ai
                </a>
              </nav>
            </header>
            <AnnouncementBanner />
            <main id="content" tabIndex={-1}>
              {children}
            </main>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}

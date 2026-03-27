"use client";

// Global announcement banner — rendered once in layout.tsx, appears on every page.
// Replace the copy below when the sprint window closes (April 3, 2026).

const SPRINT_END = new Date("2026-04-03T23:59:59");

function isSprintLive() {
  return new Date() < SPRINT_END;
}

export function AnnouncementBanner() {
  if (!isSprintLive()) return null;

  return (
    <div className="announcement-banner" role="status" aria-live="polite" aria-label="Live build sprint announcement">
      <span className="announcement-pulse" aria-hidden="true" />
      <p className="announcement-copy">
        <strong>Live build sprint · March 27 – April 3</strong>
        {" "}— Deliberately running 6 parallel client simulations to stress-test delivery speed, tooling, and decision quality under real pressure.{" "}
        <span className="announcement-subtext">This is intentional. The product is live. The engineer is shipping.</span>
      </p>
    </div>
  );
}

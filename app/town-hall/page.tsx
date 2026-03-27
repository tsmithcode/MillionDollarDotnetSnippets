import type { Metadata } from "next";
import { MotionSection } from "@/components/motion/motion-section";
import { ButtonLink } from "@/components/ui/button-link";
import { SurfacePanel } from "@/components/ui/surfaces";
import { appraisalRange, leadershipTimeline, operatingMetrics } from "@/lib/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Town Hall",
  description:
    "CEO-visible town hall surface for operating rhythm, release confidence, risk, and execution momentum.",
  path: "/town-hall"
});

const townHallRisks = [
  "Framework depth still needs to keep outrunning surface polish.",
  "The flagship .NET runtime slice still needs one clean verification pass in this environment.",
  "Commercial structure is now clear, but paid traction has not been proven yet."
];

export default function TownHallPage() {
  return (
    <div className="detail-page leadership-page">
      <MotionSection className="detail-hero leadership-hero">
        <p className="eyebrow">Town hall</p>
        <h2 className="section-title">One operating surface for release readiness, execution rhythm, and company momentum.</h2>
        <p className="section-lead">
          This is the shortest internal reading path for CEO visibility. It turns the product into an operating
          system with explicit status, current risks, and next execution priorities.
        </p>
      </MotionSection>

      <section className="leadership-metrics" aria-label="Town hall operating metrics">
        {operatingMetrics.map((item) => (
          <article className="metric-card leadership-metric" key={item.label}>
            <p className="metric-value">{item.value}</p>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <SurfacePanel aria-labelledby="town-hall-actions-title">
        <div className="leadership-intro">
          <p className="eyebrow">Fast actions</p>
          <h2 className="section-title" id="town-hall-actions-title">
            Three places leadership should go next.
          </h2>
        </div>
        <div className="leadership-question-grid">
          <article className="leadership-question">
            <h3>Review proof</h3>
            <p>Confirm the flagship enterprise slice still communicates real delivery value.</p>
            <ButtonLink href="/proof" tone="secondary">Open proof surface</ButtonLink>
          </article>
          <article className="leadership-question">
            <h3>Review leadership</h3>
            <p>Check the current category, moat, commercialization path, and appraisal framing.</p>
            <ButtonLink href="/leadership" tone="secondary">Open leadership surface</ButtonLink>
          </article>
          <article className="leadership-question">
            <h3>Review founder context</h3>
            <p>Reconnect the operating model to delivery reality and founder credibility.</p>
            <ButtonLink href="/about" tone="secondary">Open founder surface</ButtonLink>
          </article>
        </div>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="town-hall-risks-title">
        <div className="leadership-intro">
          <p className="eyebrow">Current risks</p>
          <h2 className="section-title" id="town-hall-risks-title">
            The current risk register is explicit, not implied.
          </h2>
        </div>
        <ul className="signal-list leadership-signals">
          {townHallRisks.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="town-hall-trajectory-title">
        <div className="leadership-intro">
          <p className="eyebrow">Execution trajectory</p>
          <h2 className="section-title" id="town-hall-trajectory-title">
            What the company is building toward next.
          </h2>
        </div>
        <div className="timeline-grid">
          {leadershipTimeline.map((item) => (
            <article className="timeline-card" key={item.phase}>
              <span>{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="town-hall-appraisal-title">
        <div className="leadership-intro">
          <p className="eyebrow">Value range</p>
          <h2 className="section-title" id="town-hall-appraisal-title">
            The current and expected value range stays visible during execution.
          </h2>
        </div>
        <div className="leadership-band-grid" aria-label="Town hall appraisal ranges">
          <article className="leadership-band-card">
            <span>Current</span>
            <h3>{appraisalRange.current}</h3>
            <p>{appraisalRange.reason}</p>
          </article>
          <article className="leadership-band-card">
            <span>Expected</span>
            <h3>{appraisalRange.expected}</h3>
            <p>The upside depends on deeper framework proof, productized enterprise modules, and real traction.</p>
          </article>
          <article className="leadership-band-card">
            <span>With traction</span>
            <h3>{appraisalRange.traction}</h3>
            <p>Requires adoption evidence, repeatable commercialization, and operating consistency.</p>
          </article>
        </div>
      </SurfacePanel>
    </div>
  );
}

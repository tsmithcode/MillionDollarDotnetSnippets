import type { Metadata } from "next";
import { MotionSection } from "@/components/motion/motion-section";
import { PageTelemetry } from "@/components/telemetry/telemetry-client";
import { SurfacePanel } from "@/components/ui/surfaces";
import {
  appraisalRange,
  commercializationOffers,
  leadershipMetrics,
  leadershipQuestions,
  leadershipTimeline,
  marketReasons,
  operatingMetrics
} from "@/lib/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Leadership Review",
  description:
    "Executive review surface for Million Dollar Dot Net Snippets covering buyer fit, market reasons, release confidence, and execution trajectory.",
  path: "/leadership"
});

export default function LeadershipPage() {
  return (
    <div className="detail-page leadership-page">
      <PageTelemetry page="leadership" />
      <MotionSection className="detail-hero leadership-hero">
        <p className="eyebrow">Leadership review</p>
        <h2 className="section-title">One executive surface for product truth, market fit, and release confidence.</h2>
        <p className="section-lead">
          This page is the shortest path for CEO and investor review. It explains what Million Dollar Dot Net
          Snippets is, who it serves best, what is already proven, and why the product is becoming more than a
          well-presented repository.
        </p>
      </MotionSection>

      <section className="leadership-metrics" aria-label="Leadership review metrics">
        {leadershipMetrics.map((item) => (
          <article className="metric-card leadership-metric" key={item.label}>
            <p className="metric-value">{item.value}</p>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <SurfacePanel aria-labelledby="leadership-questions-title">
        <div className="leadership-intro">
          <p className="eyebrow">Fast review</p>
          <h2 className="section-title" id="leadership-questions-title">
            Four questions leadership should be able to answer in minutes.
          </h2>
        </div>
        <div className="leadership-question-grid">
          {leadershipQuestions.map((item) => (
            <article className="leadership-question" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </SurfacePanel>

      <section className="leadership-split" aria-labelledby="market-title">
        <article className="detail-card leadership-card">
          <p className="eyebrow">Why this can win</p>
          <h2 className="section-title" id="market-title">
            The moat is disciplined leverage, not generic code volume.
          </h2>
          <div className="leadership-stack">
            {marketReasons.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-card leadership-card">
          <p className="eyebrow">Visibility</p>
          <h2 className="section-title">What leadership can track right now.</h2>
          <ul className="signal-list leadership-signals">
            <li>Buildable .NET framework and capability-first API surface</li>
            <li>Guided zero-knowledge onboarding with explicit route logic</li>
            <li>Founder authority translated into product trust</li>
            <li>Cross-browser release gate with keyboard and reduced-motion proof</li>
            <li>Production-ready narrative for premium consultant adoption</li>
          </ul>
        </article>
      </section>

      <SurfacePanel aria-labelledby="trajectory-title">
        <div className="leadership-intro">
          <p className="eyebrow">Execution trajectory</p>
          <h2 className="section-title" id="trajectory-title">
            The roadmap now compounds rather than drifting.
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

      <SurfacePanel aria-labelledby="commercial-model-title">
        <div className="leadership-intro">
          <p className="eyebrow">Commercial model</p>
          <h2 className="section-title" id="commercial-model-title">
            The business path is becoming clearer, not broader.
          </h2>
        </div>
        <div className="leadership-question-grid">
          {commercializationOffers.map((offer) => (
            <article className="leadership-question" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.detail}</p>
              <p className="leadership-note">{offer.fit}</p>
            </article>
          ))}
        </div>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="appraisal-title">
        <div className="leadership-intro">
          <p className="eyebrow">Appraisal lens</p>
          <h2 className="section-title" id="appraisal-title">
            Current value is credible, but the bigger upside still depends on deeper framework proof.
          </h2>
        </div>
        <div className="leadership-band-grid" aria-label="Appraisal ranges">
          <article className="leadership-band-card">
            <span>Current blended range</span>
            <h3>{appraisalRange.current}</h3>
            <p>{appraisalRange.reason}</p>
          </article>
          <article className="leadership-band-card">
            <span>Expected after execution</span>
            <h3>{appraisalRange.expected}</h3>
            <p>Assumes the commercialization model, enterprise proof slices, and packaging depth are executed well.</p>
          </article>
          <article className="leadership-band-card">
            <span>With early traction</span>
            <h3>{appraisalRange.traction}</h3>
            <p>Requires real adoption, paid usage, or strategic consulting pull on top of the current product quality.</p>
          </article>
        </div>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="operating-visibility-title">
        <div className="leadership-intro">
          <p className="eyebrow">Operating company layer</p>
          <h2 className="section-title" id="operating-visibility-title">
            The company now has explicit operating artifacts, not just a polished product surface.
          </h2>
        </div>
        <div className="leadership-band-grid" aria-label="Operating company metrics">
          {operatingMetrics.map((item) => (
            <article className="leadership-band-card" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.value}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="leadership-reading-path-title">
        <div className="leadership-intro">
          <p className="eyebrow">Guided reading path</p>
          <h2 className="section-title" id="leadership-reading-path-title">
            The shortest high-confidence sequence for strategic readers.
          </h2>
        </div>
        <div className="leadership-question-grid">
          <article className="leadership-question">
            <h3>1. Leadership</h3>
            <p>Understand category, buyer, moat, and current release confidence.</p>
          </article>
          <article className="leadership-question">
            <h3>2. Proof</h3>
            <p>Validate that the product has real technical evidence behind the narrative.</p>
          </article>
          <article className="leadership-question">
            <h3>3. Founder</h3>
            <p>Confirm that the product is grounded in delivery experience rather than presentation alone.</p>
          </article>
        </div>
      </SurfacePanel>
    </div>
  );
}

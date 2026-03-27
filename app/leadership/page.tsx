import { MotionSection } from "@/components/motion/motion-section";
import { SurfacePanel } from "@/components/ui/surfaces";
import { leadershipMetrics, leadershipQuestions, leadershipTimeline, marketReasons } from "@/lib/site-content";

export default function LeadershipPage() {
  return (
    <div className="detail-page leadership-page">
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
    </div>
  );
}

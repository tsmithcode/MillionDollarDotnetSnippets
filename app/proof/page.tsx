import { MotionSection } from "@/components/motion/motion-section";
import { CapabilityGrid, SectionHeader, SurfacePanel } from "@/components/ui/surfaces";
import { capabilityCards, marketReasons, proofRecords, proofStats } from "@/lib/site-content";

const traceLines = [
  "Promote urgent work: Applied and set 'Status' to 'Escalated'.",
  "Route CAD work: Applied and set 'Queue' to 'Engineering Automation'.",
  "Route ERP work: Skipped because 'CAD' did not match 'ERP'."
];

export default function ProofPage() {
  return (
    <div className="detail-page">
      <MotionSection className="detail-hero proof-hero">
        <p className="eyebrow">Proof surface</p>
        <h2 className="section-title">What the framework proves today in production-like terms.</h2>
        <p className="section-lead">
          The current framework proves a buildable .NET product surface, a golden-path example, rule-by-rule
          diagnostics, and dual ingestion from file and HTTP-backed sources.
        </p>
      </MotionSection>

      <section className="proof-metrics" id="success" aria-label="Framework proof metrics">
        {proofStats.map((stat) => (
          <article className="metric-card" key={stat.label}>
            <p className="metric-value">{stat.value}</p>
            <h3>{stat.label}</h3>
            <p>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="proof-layout proof-ledger" id="proof-grid">
        <article className="detail-card" id="architecture">
          <h3>Architecture</h3>
          <ul className="signal-list">
            <li>Core contracts and records</li>
            <li>Application orchestration</li>
            <li>Infrastructure boundaries</li>
            <li>Rules engine behavior</li>
            <li>Capability-first public API surface</li>
          </ul>
        </article>
        <article className="detail-card" id="diagnostics">
          <h3>Diagnostics</h3>
          <p>
            The framework does not just validate. It explains. Each rule exposes why it applied or why it
            was skipped so the product logic stays auditable.
          </p>
          <div className="trace-panel" aria-label="Sample rule trace output">
            {traceLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </article>
      </section>

      <SurfacePanel id="capabilities">
        <div className="proof-pill-row" aria-label="Proof highlights">
          <span>File source mode</span>
          <span>HTTP source mode</span>
          <span>Validation issues surfaced</span>
          <span>Queue outcomes shown</span>
        </div>
        <CapabilityGrid>
          {capabilityCards.map((card) => (
            <article className="detail-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </CapabilityGrid>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="records-heading">
        <SectionHeader
          eyebrow="Golden path records"
          title="Two concrete records show what success and failure look like."
          titleId="records-heading"
        />
        <div className="record-grid">
          {proofRecords.map((record) => (
            <article className="record-card" key={record.id}>
              <div className="record-head">
                <div>
                  <p className="eyebrow">{record.id}</p>
                  <h4>{record.queue}</h4>
                </div>
                <span className="record-status">{record.status}</span>
              </div>
              <p>{record.summary}</p>
              <ul className="signal-list">
                {record.mode.map((mode) => (
                  <li key={mode}>{mode}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SurfacePanel>

      <SurfacePanel aria-labelledby="market-proof-heading">
        <SectionHeader
          eyebrow="Market proof"
          title="Why this proof matters commercially, not just technically."
          titleId="market-proof-heading"
        />
        <div className="leadership-question-grid">
          {marketReasons.map((item) => (
            <article className="leadership-question" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </SurfacePanel>
    </div>
  );
}

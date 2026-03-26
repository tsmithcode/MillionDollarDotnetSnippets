const traceLines = [
  "Promote urgent work: Applied and set 'Status' to 'Escalated'.",
  "Route CAD work: Applied and set 'Queue' to 'Engineering Automation'.",
  "Route ERP work: Skipped because 'CAD' did not match 'ERP'."
];

export default function ProofPage() {
  return (
    <div className="detail-page">
      <section className="detail-hero">
        <p className="eyebrow">Proof surface</p>
        <h2 className="section-title">What the framework proves today in production-like terms.</h2>
        <p className="section-lead">
          The current framework proves a buildable .NET product surface, a golden-path example, rule-by-rule
          diagnostics, and dual ingestion from file and HTTP-backed sources.
        </p>
      </section>

      <section className="proof-layout">
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

      <section className="proof-summary">
        <div className="proof-pill-row" aria-label="Proof highlights">
          <span>File source mode</span>
          <span>HTTP source mode</span>
          <span>Validation issues surfaced</span>
          <span>Queue outcomes shown</span>
        </div>
        <div className="detail-grid">
          <article className="detail-card">
            <h3>Zero-knowledge success marker</h3>
            <p>
              A first-time user should be able to run the quickstart and recognize success from the two
              ingestion modes and the queue summary alone.
            </p>
          </article>
          <article className="detail-card">
            <h3>Browser confidence target</h3>
            <p>
              This site is set up to add Playwright-based browser and mobile proof so accessibility and
              guided flow behavior can become release gates.
            </p>
          </article>
          <article className="detail-card">
            <h3>What comes next</h3>
            <p>
              Expand the wizard, connect more proof surfaces to the live framework, and treat the website
              as a product entrypoint instead of a documentation wrapper.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

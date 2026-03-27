import type { Metadata } from "next";
import { MotionSection } from "@/components/motion/motion-section";
import { PageTelemetry } from "@/components/telemetry/telemetry-client";
import { CapabilityGrid, SectionHeader, SurfacePanel } from "@/components/ui/surfaces";
import { capabilityCards, marketReasons, proofRecords, proofStats } from "@/lib/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Proof Surface",
  description:
    "Production-like proof for Million Dollar Dot Net Snippets: dual-ingestion flow, auditable diagnostics, and leadership-readable technical evidence.",
  path: "/proof"
});

const traceLines = [
  "Promote urgent work: Applied and set 'Status' to 'Escalated'.",
  "Route ERP operations: Applied and set 'Queue' to 'Enterprise Operations'.",
  "Assign ERP connector profile: Applied and set 'ConnectorProfile' to 'ERP-Bridge'.",
  "Platinum tier requires executive approval: Applied and set 'ApprovalLane' to 'Executive Review'."
];

export default function ProofPage() {
  return (
    <div className="detail-page">
      <PageTelemetry page="proof" />
      <MotionSection className="detail-hero proof-hero">
        <p className="eyebrow">Proof surface</p>
        <h2 className="section-title">What the framework proves today in production-like terms.</h2>
        <p className="section-lead">
          The current framework now proves a flagship enterprise workflow: dual ingestion, rule-by-rule
          diagnostics, connector routing, SLA assignment, approval lanes, and executive-readable operational output.
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
          <h3>Flagship workflow</h3>
          <ul className="signal-list">
            <li>ERP and CAD records ingested from file and HTTP-backed sources</li>
            <li>Connector profile assignment based on source system</li>
            <li>SLA windows assigned from operating region</li>
            <li>Approval lanes assigned from customer tier</li>
            <li>Queue and escalation outcomes emitted for delivery teams</li>
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
          <span>Connector profile shown</span>
          <span>SLA window shown</span>
          <span>Approval lane shown</span>
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
          title="Three enterprise records show escalation, validation failure, and cross-system routing."
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

      <SurfacePanel aria-labelledby="next-reading-heading">
        <SectionHeader
          eyebrow="Guided next step"
          title="The proof page should lead somewhere, not end the story."
          titleId="next-reading-heading"
        />
        <div className="leadership-question-grid">
          <article className="leadership-question">
            <h3>If the proof convinced you</h3>
            <p>Next read the founder page to understand why these delivery patterns exist and why they are credible.</p>
          </article>
          <article className="leadership-question">
            <h3>If you need the executive view</h3>
            <p>Then open leadership to see the buyer, category, moat, and release confidence in one reading path.</p>
          </article>
        </div>
      </SurfacePanel>
    </div>
  );
}

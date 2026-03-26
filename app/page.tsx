import { capabilityCards } from "@/lib/site-content";
import { Wizard } from "@/components/wizard";

export default function HomePage() {
  return (
    <div className="page-flow">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Guided onboarding for high-value .NET delivery work</p>
          <h2 className="hero-title">A framework wizard with civic-grade clarity and premium product discipline.</h2>
          <p className="hero-body">
            This is not a marketing brochure. It is a decision-guided path for consultants, architects,
            and technical leads who need to know what the framework is, why it matters, and how to use
            it fast.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#wizard">
              Start guided path
            </a>
            <a className="secondary-action" href="/proof">
              See browser-ready proof
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Product confidence summary">
          <div className="proof-band">
            <span>Buildable .NET framework</span>
            <span>Auditable rules</span>
            <span>Zero-knowledge path</span>
          </div>
          <div className="hero-card-grid">
            {capabilityCards.map((card) => (
              <article className="signal-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="support-panel" aria-labelledby="support-heading">
        <div>
          <p className="eyebrow">What makes this feel different</p>
          <h2 id="support-heading" className="section-title">
            The first-time user path is treated like critical infrastructure.
          </h2>
        </div>
        <div className="support-columns">
          <div>
            <h3>Accessible by default</h3>
            <p>Large targets, plain language, explicit next steps, and visible allowed or blocked reasoning.</p>
          </div>
          <div>
            <h3>Story plus proof</h3>
            <p>The creator story, the framework promise, and the runtime proof all reinforce each other.</p>
          </div>
          <div>
            <h3>Built for pressure</h3>
            <p>The interface is calm and legible enough to make sense under time pressure, not just look good in a screenshot.</p>
          </div>
        </div>
      </section>

      <Wizard />
    </div>
  );
}

import type { Metadata } from "next";
import { HeroStage } from "@/components/three/hero-stage";
import { MotionSection } from "@/components/motion/motion-section";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { ButtonLink } from "@/components/ui/button-link";
import { capabilityCards, leadershipMetrics, premiumArtifacts, proofStats } from "@/lib/site-content";
import { Wizard } from "@/components/wizard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Framework Wizard",
  description:
    "A guided, premium product surface for Million Dollar Dot Net Snippets with role-aware onboarding, proof, and leadership review.",
  path: "/"
});

export default function HomePage() {
  return (
    <div className="page-flow">
      <MotionSection className="hero-panel hero-poster">
        <div className="hero-copy">
          <p className="eyebrow">Million Dollar Dot Net Snippets</p>
          <h2 className="hero-title">Reusable .NET leverage for the people who carry difficult software delivery.</h2>
          <p className="hero-body">
            A guided framework experience for consultants, architects, and technical leads who need a
            sharper delivery stack, credible proof, and a product surface that feels as disciplined as the
            code underneath it.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#wizard">Start the framework wizard</ButtonLink>
            <ButtonLink href="/proof" tone="secondary">
              See the proof surface
            </ButtonLink>
            <ButtonLink href="/leadership" tone="secondary">
              Open leadership review
            </ButtonLink>
          </div>
        </div>

        <div className="hero-proof" aria-label="Product confidence summary">
          <div className="proof-band">
            <span>Cross-platform surface</span>
            <span>Accessible by default</span>
            <span>Auditable logic</span>
          </div>
          <StaggerGroup className="hero-stat-grid">
            {proofStats.slice(0, 3).map((stat) => (
              <StaggerItem key={stat.label}>
                <article className="hero-stat">
                  <p>{stat.value}</p>
                  <span>{stat.label}</span>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <HeroStage />
        </div>
      </MotionSection>

      <MotionSection className="editorial-band editorial-band-immersive" delay={0.05}>
        <div className="editorial-intro">
          <p className="eyebrow">Why this product feels different</p>
          <h2 className="section-title">The public surface behaves like guided infrastructure, not brochureware.</h2>
        </div>
        <StaggerGroup className="editorial-rail">
          <StaggerItem>
            <article>
              <h3>Clarity under pressure</h3>
              <p>Every major state is readable, explainable, and operable on mobile without degrading trust.</p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article>
              <h3>Story with proof</h3>
              <p>The founder authority, the wizard logic, and the framework outputs reinforce the same market truth.</p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article>
              <h3>Premium by restraint</h3>
              <p>The interface uses stronger hierarchy, calmer surfaces, and less clutter so ambition feels controlled.</p>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </MotionSection>

      <MotionSection className="capability-ribbon capability-ribbon-immersive" aria-labelledby="capability-heading" delay={0.08}>
        <div className="editorial-intro">
          <p className="eyebrow">Framework capability</p>
          <h2 className="section-title" id="capability-heading">
            Four capability lanes, one delivery mission.
          </h2>
        </div>
        <StaggerGroup className="ribbon-grid">
          {capabilityCards.map((card) => (
            <StaggerItem key={card.title}>
              <article className="ribbon-card">
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </MotionSection>

      <MotionSection className="vision-band" delay={0.12}>
        <div className="vision-band-copy">
          <p className="eyebrow">Execution standard</p>
          <h2 className="section-title">Ambition without chaos. Motion without noise. Proof without hand-waving.</h2>
          <p className="section-lead">
            The visual system is now designed to carry a more ambitious name and mission while keeping the
            interaction model calm, legible, and operationally trustworthy.
          </p>
        </div>
        <div className="vision-band-notes">
          <article>
            <h3>Clarity under pressure</h3>
            <p>Every animation, 3D decision, and reveal is expected to preserve orientation rather than compete with it.</p>
          </article>
          <article>
            <h3>Reduced-motion safe</h3>
            <p>The product still works cleanly when users prefer less animation, so premium never comes at the cost of access.</p>
          </article>
          <article>
            <h3>3D as narrative support</h3>
            <p>The stage is there to create atmosphere and memory, not to block the wizard or dilute the product message.</p>
          </article>
        </div>
      </MotionSection>

      <MotionSection className="leadership-band" delay={0.15}>
        <div className="leadership-band-copy">
          <p className="eyebrow">CEO and investor visibility</p>
          <h2 className="section-title">The product now has a clean executive reading path, not just a technical one.</h2>
          <p className="section-lead">
            Leadership can review the buyer, the category, the release confidence, and the founder advantage
            without reverse-engineering the repo.
          </p>
          <ButtonLink href="/leadership">Review the leadership surface</ButtonLink>
        </div>
        <div className="leadership-band-grid" aria-label="Leadership review highlights">
          {leadershipMetrics.slice(0, 3).map((item) => (
            <article className="leadership-band-card" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.value}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="artifact-band" delay={0.18}>
        <div className="editorial-intro">
          <p className="eyebrow">Premium artifact system</p>
          <h2 className="section-title">Every high-value route now behaves like part of one launch-grade product narrative.</h2>
          <p className="section-lead">
            The homepage, proof surface, founder story, and leadership review now double as executive artifacts,
            shareable surfaces, and adoption paths.
          </p>
        </div>
        <div className="artifact-grid">
          {premiumArtifacts.map((artifact) => (
            <article className="artifact-card" key={artifact.title}>
              <p className="eyebrow">Launch-ready</p>
              <h3>{artifact.title}</h3>
              <p>{artifact.detail}</p>
              <ButtonLink href={artifact.href} tone="secondary">
                {artifact.label}
              </ButtonLink>
            </article>
          ))}
        </div>
      </MotionSection>

      <Wizard />
    </div>
  );
}

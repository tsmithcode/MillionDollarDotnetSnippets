import type { Metadata } from "next";
import { MotionSection } from "@/components/motion/motion-section";
import { guidedReadingPaths } from "@/lib/site-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Thomas Smith",
  description:
    "Founder story and delivery credibility behind Million Dollar Dot Net Snippets and the framework wizard product surface.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <div className="detail-page">
      <MotionSection className="founder-hero">
        <div className="founder-overline">
          <p className="eyebrow">About the creator</p>
          <span>tsmithcode.ai</span>
        </div>
        <h2 className="section-title">Thomas Smith builds software where engineering, operations, and system reality collide.</h2>
        <p className="section-lead">
          He is the creator of Million Dollar Dot Net Snippets and the founder behind
          {" "}
          <a href="https://www.tsmithcode.ai">tsmithcode.ai</a>.
          His background spans Autodesk platforms, enterprise integrations, governed data systems, and the
          business software work that teams rely on when deadlines are real.
        </p>
      </MotionSection>

      <section className="founder-facts" aria-label="Founder evidence highlights">
        <article className="metric-card">
          <p className="metric-value">24%</p>
          <h3>Autodesk savings reduction</h3>
          <p>Achieved in seven months through licensing optimization, governance, and training.</p>
        </article>
        <article className="metric-card">
          <p className="metric-value">.NET 8</p>
          <h3>Modernization proof</h3>
          <p>Delivered migrations from .NET Framework 4.8 into current enterprise-ready delivery patterns.</p>
        </article>
        <article className="metric-card">
          <p className="metric-value">ERP + CAD</p>
          <h3>Cross-system fluency</h3>
          <p>Worked across engineering, ERP, warehouse, and reporting layers instead of staying in a single silo.</p>
        </article>
      </section>

      <MotionSection className="founder-story-grid">
        <article className="story-panel">
          <p className="eyebrow">Operating model</p>
          <h3>What he is known for</h3>
          <p>
            Turning scattered workflows into governed architecture, building auditable integrations, and
            making business software easier to trust across technical and non-technical stakeholders.
          </p>
        </article>
        <article className="story-panel">
          <p className="eyebrow">Why this framework exists</p>
          <h3>Because the highest-value .NET work is usually messy, operational, and worth making reusable.</h3>
          <p>
            Million Dollar Dot Net Snippets is built around repeated high-value moves: making ugly
            integrations survivable, surfacing validation and rules, and compressing delivery time without
            sacrificing clarity.
          </p>
        </article>
      </MotionSection>

      <section className="founder-visibility" aria-label="Founder visibility layer">
        <article className="story-panel">
          <p className="eyebrow">Executive reading</p>
          <h3>Founder credibility is being translated into product structure, not treated like biography filler.</h3>
          <p>
            The site now turns founder experience into visible signals: clearer category framing, stronger proof,
            and a leadership-ready explanation of why this framework can become a premium delivery asset.
          </p>
        </article>
        <article className="story-panel">
          <p className="eyebrow">Review path</p>
          <h3>CEO and investor audiences now have a direct route.</h3>
          <p>
            The leadership surface condenses buyer fit, market reasons, release confidence, and execution
            trajectory into one page so strategic review does not depend on technical inference.
          </p>
        </article>
      </section>

      <section className="founder-visibility" aria-label="Guided founder reading paths">
        {guidedReadingPaths.map((path) => (
          <article className="story-panel" key={path.title}>
            <p className="eyebrow">{path.title}</p>
            <h3>{path.audience}</h3>
            <p>{path.path.join(" -> ")}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

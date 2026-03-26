export default function AboutPage() {
  return (
    <div className="detail-page">
      <section className="detail-hero">
        <p className="eyebrow">About the creator</p>
        <h2 className="section-title">Thomas Smith built this framework from real integration pressure, not snippet theater.</h2>
        <p className="section-lead">
          Thomas Smith is the creator of Million Dollar Dot Net Snippets and the founder behind
          {" "}
          <a href="https://www.tsmithcode.ai">tsmithcode.ai</a>.
          His work sits at the intersection of engineering systems, operations, Autodesk workflows, and
          enterprise .NET delivery.
        </p>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <h3>Background</h3>
          <p>
            7+ years delivering production .NET systems and 12+ years in CAD and engineering workflows.
            The result is a framework shaped by real manufacturing, ERP, reporting, and Autodesk pressure.
          </p>
        </article>
        <article className="detail-card">
          <h3>What he is known for</h3>
          <p>
            Turning scattered workflows into governed system architecture, building auditable integrations,
            and making business software easier to trust across technical and non-technical stakeholders.
          </p>
        </article>
        <article className="detail-card">
          <h3>Evidence</h3>
          <p>
            Reduced Autodesk licensing spend by 24 percent in seven months, modernized add-ins from .NET
            Framework 4.8 to .NET 8, and built governed analytics and integration architecture spanning
            engineering, ERP, warehouse, and reporting layers.
          </p>
        </article>
      </section>

      <section className="detail-narrative">
        <div>
          <p className="eyebrow">Why the framework exists</p>
          <h3 className="section-title">The highest-value .NET work is usually messy, operational, and worth making reusable.</h3>
        </div>
        <p>
          This framework is built around the kinds of moves that high-value technical operators repeat:
          making ugly integrations survivable, making validation and rules visible, reducing delivery drag,
          and creating system behavior that can be explained to people who did not author the code.
        </p>
        <p>
          That is why the site now behaves like a framework wizard instead of a generic website. The
          product should be understandable to a first-time visitor and still feel credible to a senior
          architect.
        </p>
      </section>
    </div>
  );
}

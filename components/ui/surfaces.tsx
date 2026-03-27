export function SurfacePanel({
  children,
  id,
  ...props
}: Readonly<React.HTMLAttributes<HTMLElement>>) {
  return (
    <section className="support-panel" id={id} {...props}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  titleId
}: Readonly<{
  eyebrow: string;
  title: string;
  titleId: string;
}>) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={titleId}>
        {title}
      </h2>
    </div>
  );
}

export function CapabilityGrid({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="support-columns">{children}</div>;
}

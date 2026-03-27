type Tone = "primary" | "secondary";

export function ButtonLink({
  children,
  href,
  tone = "primary"
}: Readonly<{
  children: React.ReactNode;
  href: string;
  tone?: Tone;
}>) {
  const className = tone === "secondary" ? "secondary-action" : "primary-action";
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

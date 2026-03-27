"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

export function MotionSection({
  children,
  className,
  delay = 0
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>) {
  const reduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (reduceMotion || !hasMounted) {
    return <section className={className}>{children}</section>;
  }

  return (
    <m.section
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.58 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </m.section>
  );
}

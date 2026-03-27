"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

export function StaggerGroup({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const reduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (reduceMotion || !hasMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.09,
            delayChildren: 0.08
          }
        }
      }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const reduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (reduceMotion || !hasMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.52 } }
      }}
    >
      {children}
    </m.div>
  );
}

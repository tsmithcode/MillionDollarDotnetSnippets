"use client";

import { useEffect } from "react";

export function SkipLink() {
  const focusContent = (target: HTMLElement) => {
    target.setAttribute("tabindex", "-1");
    target.scrollIntoView({ block: "start" });
    target.focus({ preventScroll: true });
  };

  useEffect(() => {
    const syncHashFocus = () => {
      if (window.location.hash !== "#content") {
        return;
      }

      const target = document.getElementById("content");
      if (!target) {
        return;
      }

      focusContent(target);
      window.setTimeout(() => focusContent(target), 0);
    };

    syncHashFocus();
    window.addEventListener("hashchange", syncHashFocus);
    return () => window.removeEventListener("hashchange", syncHashFocus);
  }, []);

  return (
    <a
      className="skip-link"
      href="#content"
      onClick={() => {
        const target = document.getElementById("content");
        if (!target) {
          return;
        }

        window.setTimeout(() => focusContent(target), 0);
        requestAnimationFrame(() => focusContent(target));
      }}
    >
      Skip to content
    </a>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DeferredCanvasStage = dynamic(
  () => import("@/components/three/canvas-stage").then((module) => module.CanvasStage),
  {
    ssr: false,
    loading: () => <StageFallback />
  }
);

function StageFallback() {
  return (
    <div className="stage-shell stage-shell--fallback" aria-label="Framework stage preview">
      <div className="stage-fallback-copy">
        <p className="eyebrow">Framework stage</p>
        <h3>Calm by default. Immersive when the device can afford it.</h3>
        <p>
          The cinematic layer now loads after the main product story is readable, keeping the first
          interaction fast and preserving premium atmosphere.
        </p>
      </div>
      <div className="stage-fallback-mark" aria-hidden="true">
        <span>MDS</span>
      </div>
    </div>
  );
}

export function HeroStage() {
  const reducedMotion = useReducedMotion();
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const node = stageRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRenderCanvas(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [reducedMotion]);

  return <div ref={stageRef}>{shouldRenderCanvas && !reducedMotion ? <DeferredCanvasStage /> : <StageFallback />}</div>;
}

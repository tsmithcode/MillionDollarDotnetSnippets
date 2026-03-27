"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { TelemetryEventName } from "@/lib/telemetry";

const sessionStorageKey = "mds.telemetry.session";

function canTrack() {
  if (typeof window === "undefined") {
    return false;
  }

  return navigator.doNotTrack !== "1";
}

function getSessionId() {
  const existing = window.sessionStorage.getItem(sessionStorageKey);

  if (existing) {
    return existing;
  }

  const sessionId = crypto.randomUUID();
  window.sessionStorage.setItem(sessionStorageKey, sessionId);
  return sessionId;
}

export function trackTelemetry(event: TelemetryEventName, detail?: Record<string, string>) {
  if (!canTrack()) {
    return;
  }

  const payload = JSON.stringify({
    event,
    path: window.location.pathname,
    sessionId: getSessionId(),
    detail
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/telemetry", blob);
    return;
  }

  void fetch("/api/telemetry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true
  });
}

export function PageTelemetry({ page }: Readonly<{ page: string }>) {
  const pathname = usePathname();

  useEffect(() => {
    trackTelemetry("page_view", { page, pathname });
  }, [page, pathname]);

  return null;
}

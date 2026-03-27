import { NextResponse } from "next/server";
import { sanitizeDetail, type TelemetryEventName, type TelemetryPayload } from "@/lib/telemetry";

const allowedEvents = new Set<TelemetryEventName>([
  "page_view",
  "wizard_step_changed",
  "wizard_selection_changed",
  "wizard_recommendation_opened"
]);

function isTelemetryPayload(input: unknown): input is TelemetryPayload {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  const value = input as Record<string, unknown>;

  return (
    typeof value.event === "string" &&
    allowedEvents.has(value.event as TelemetryEventName) &&
    typeof value.path === "string" &&
    typeof value.sessionId === "string" &&
    (value.detail === undefined || typeof value.detail === "object")
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isTelemetryPayload(body)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = {
    event: body.event,
    path: body.path.slice(0, 200),
    sessionId: body.sessionId.slice(0, 80),
    detail: sanitizeDetail(body.detail as Record<string, string> | undefined),
    receivedAt: new Date().toISOString()
  };

  console.log("[telemetry]", JSON.stringify(payload));

  return new NextResponse(null, { status: 204 });
}

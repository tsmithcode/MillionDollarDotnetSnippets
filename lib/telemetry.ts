export type TelemetryEventName =
  | "page_view"
  | "wizard_step_changed"
  | "wizard_selection_changed"
  | "wizard_recommendation_opened";

export type TelemetryPayload = {
  event: TelemetryEventName;
  path: string;
  sessionId: string;
  detail?: Record<string, string>;
};

export function sanitizeDetail(detail: Record<string, string> | undefined) {
  if (!detail) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(detail)
      .slice(0, 10)
      .map(([key, value]) => [key.slice(0, 64), value.slice(0, 160)])
  );
}

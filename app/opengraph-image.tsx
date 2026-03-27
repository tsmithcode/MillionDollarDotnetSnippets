import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Million Dollar Dot Net Snippets premium framework preview";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 42,
          background:
            "radial-gradient(circle at top left, rgba(223,161,91,0.26), transparent 28%), linear-gradient(180deg, #181818 0%, #0f1011 100%)",
          color: "#f4efe8",
          fontFamily: "Georgia, serif"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255, 241, 220, 0.18)",
            borderRadius: 30,
            background: "rgba(18, 19, 20, 0.84)",
            padding: "42px 46px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <div
                style={{
                  width: 86,
                  height: 86,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 22,
                  background: "linear-gradient(145deg, #ffd18c, #b7742d)",
                  color: "#16110b",
                  fontSize: 40,
                  fontWeight: 700
                }}
              >
                MDS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#f2d19f" }}>
                  Million Dollar Dot Net Snippets
                </div>
                <div style={{ fontSize: 30, fontFamily: "Arial, sans-serif", fontWeight: 600 }}>
                  Framework Wizard
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                fontFamily: "Arial, sans-serif",
                fontSize: 18,
                color: "#dccfbd"
              }}
            >
              <span style={pillStyle}>Guided onboarding</span>
              <span style={pillStyle}>Cross-browser proof</span>
              <span style={pillStyle}>Executive review</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "82%" }}>
            <div style={{ fontSize: 82, lineHeight: 0.95, letterSpacing: -3 }}>
              Reusable .NET leverage for high-value delivery work
            </div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 28,
                lineHeight: 1.4,
                color: "#d9cdbc"
              }}
            >
              A premium consultant acceleration framework with auditable rules, guided product adoption, and
              leadership-ready proof.
            </div>
          </div>

          <div style={{ display: "flex", gap: 18 }}>
            <Metric label="Release confidence" value="15/15" detail="browser gate checks" />
            <Metric label="Ingestion modes" value="2" detail="file and HTTP-backed" />
            <Metric label="Primary buyer" value="Consultants" detail="architects and leads" />
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        flex: 1,
        borderRadius: 20,
        border: "1px solid rgba(255, 241, 220, 0.16)",
        padding: "20px 22px",
        background: "rgba(255, 255, 255, 0.03)"
      }}
    >
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 16, textTransform: "uppercase", color: "#f2d19f" }}>
        {label}
      </div>
      <div style={{ fontSize: 42 }}>{value}</div>
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 20, color: "#d9cdbc" }}>{detail}</div>
    </div>
  );
}

const pillStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid rgba(255, 241, 220, 0.16)",
  background: "rgba(255,255,255,0.04)"
} as const;

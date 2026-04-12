import { ImageResponse } from "next/og";

export const alt = "Calore — your fitness decision engine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
            }}
          >
            calore
          </span>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#f97316",
            }}
          />
        </div>
        <p
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          Stop guessing your fitness. Real-time decisions from your data.
        </p>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "Phomoji — your forgotten photos, rediscovered daily";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const iconBuffer = await readFile(join(process.cwd(), "src/app/icon.png"));
  const iconSrc = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 42%, #5b3d8a 100%)",
          padding: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            maxWidth: 640,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.12,
              letterSpacing: -0.5,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
            }}
          >
            Your forgotten photos, rediscovered
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(250,250,250,0.9)",
              lineHeight: 1.35,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
            }}
          >
            One random memory from your camera roll — every day.
          </div>
          <div
            style={{
              marginTop: 8,
              alignSelf: "flex-start",
              fontSize: 22,
              fontWeight: 600,
              color: "#f5e9ff",
              background: "rgba(255,255,255,0.14)",
              padding: "14px 26px",
              borderRadius: 14,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
            }}
          >
            Coming soon · phomoji.com
          </div>
        </div>
        <img
          src={iconSrc}
          width={360}
          height={360}
          alt=""
          style={{
            borderRadius: 56,
            flexShrink: 0,
            boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}

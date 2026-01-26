import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f5f0 0%, #fafafa 100%)",
          position: "relative",
        }}
      >
        {/* V letterform */}
        <div
          style={{
            display: "flex",
            color: "#557a5f",
            fontSize: 22,
            fontWeight: 600,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
          }}
        >
          V
        </div>
        {/* Botanical accent - small leaf */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
            width: 6,
            height: 6,
            borderRadius: "50% 0 50% 50%",
            background: "#6b8e73",
            transform: "rotate(-45deg)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

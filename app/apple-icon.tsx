import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
        {/* Decorative botanical circle */}
        <div
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "1px solid #d4d9d6",
            opacity: 0.3,
            display: "flex",
          }}
        />

        {/* V letterform */}
        <div
          style={{
            display: "flex",
            color: "#557a5f",
            fontSize: 110,
            fontWeight: 600,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.03em",
            position: "relative",
            zIndex: 1,
          }}
        >
          V
        </div>

        {/* Botanical leaf accents */}
        <div
          style={{
            position: "absolute",
            bottom: 25,
            right: 25,
            width: 30,
            height: 30,
            borderRadius: "50% 0 50% 50%",
            background: "linear-gradient(135deg, #6b8e73 0%, #557a5f 100%)",
            transform: "rotate(-45deg)",
            opacity: 0.8,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 20,
            left: 30,
            width: 20,
            height: 20,
            borderRadius: "50% 0 50% 50%",
            background: "linear-gradient(135deg, #7a9d82 0%, #6b8e73 100%)",
            transform: "rotate(135deg)",
            opacity: 0.6,
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

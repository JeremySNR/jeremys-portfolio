import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title") || "My take on AI.";
  const font = await readFile(
    path.join(process.cwd(), "public/broadcast/fonts/BarlowCondensed-BlackItalic.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "#182780",
        color: "#ffcf34",
        fontFamily: "Broadcast",
      }}
    >
      <span style={{ fontSize: 45 }}>JEREMY SMITH</span>
      <span style={{ fontSize: title.length > 70 ? 76 : 104, lineHeight: 1 }}>{title}</span>
      <div style={{ width: 170, height: 14, background: "#ff784c" }} />
    </div>,
    { width: 1200, height: 630, fonts: [{ name: "Broadcast", data: font, style: "normal" }] },
  );
}

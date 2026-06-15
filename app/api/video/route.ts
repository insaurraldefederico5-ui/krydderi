import { createReadStream, statSync } from "fs";
import { join } from "path";
import { NextRequest } from "next/server";
import { Readable } from "stream";

const VIDEO_PATH = join(process.cwd(), "public", "video", "spices.mp4");

export async function GET(req: NextRequest) {
  let stat: ReturnType<typeof statSync>;
  try {
    stat = statSync(VIDEO_PATH);
  } catch {
    return new Response("Video not found", { status: 404 });
  }

  const fileSize = stat.size;
  const range = req.headers.get("range");

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const stream = createReadStream(VIDEO_PATH, { start, end });
    const webStream = Readable.toWeb(stream) as ReadableStream;

    return new Response(webStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const stream = createReadStream(VIDEO_PATH);
  const webStream = Readable.toWeb(stream) as ReadableStream;

  return new Response(webStream, {
    status: 200,
    headers: {
      "Content-Length": String(fileSize),
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

import { readFileSync } from "node:fs";
import { join } from "node:path";

export const contentType = "image/svg+xml";

export default function Icon() {
  // Pick a random icon (1-5)
  const randomIndex = Math.floor(Math.random() * 5) + 1;
  const iconPath = join(
    process.cwd(),
    "public",
    "favicon",
    `icon-${randomIndex}.svg`,
  );
  const svgContent = readFileSync(iconPath, "utf-8");

  return new Response(svgContent, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

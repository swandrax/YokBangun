import fs from "fs";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();
const svgPath = path.join(rootDir, "app", "icon.svg");
const iconsDir = path.join(rootDir, "public", "icons");

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Copy SVG to public
fs.copyFileSync(svgPath, path.join(rootDir, "public", "icon.svg"));

const svgBuffer = fs.readFileSync(svgPath);

async function generate() {
  console.log("Generating PWA icons...");

  // 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, "icon-192.png"));
  console.log("✓ icon-192.png");

  // 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, "icon-512.png"));
  console.log("✓ icon-512.png");

  // Maskable 512x512 with safe area padding
  await sharp(svgBuffer)
    .resize(410, 410)
    .extend({
      top: 51,
      bottom: 51,
      left: 51,
      right: 51,
      background: "#1F5D45",
    })
    .png()
    .toFile(path.join(iconsDir, "maskable-512.png"));
  console.log("✓ maskable-512.png");

  // Apple touch icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png");

  console.log("All PWA icons generated successfully!");
}

generate().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});

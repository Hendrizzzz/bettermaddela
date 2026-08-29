import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Design-token gate: the Golden Hour palette is closed. Any hex or rgba
// channel outside this set fails the build so stray colors cannot return.
const approvedHex = new Set([
  // core
  "fffcf4", "ffffff", "221d14", "171208", "3a2f1b",
  "f7efd8", "e8dfc8", "f5b301", "8a5e0f", "7a540d", "6b6353",
  // semantic
  "146c2e", "e6f4ea", "d62828",
]);
const approvedRgbaChannels = new Set(["34", "255", "247", "20"]);

const cssDir = "public/assets/css";
// Vendored third-party styles keep upstream integrity and are not authored
// palette surface. The allowlist is explicit so stray files cannot slip in.
const vendoredCss = new Set(["leaflet.css"]);
const errors = [];

function expand3(hex) {
  return hex.length === 3
    ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    : hex;
}

for (const file of readdirSync(cssDir)) {
  if (!file.endsWith(".css")) continue;
  if (vendoredCss.has(file)) continue;
  const path = join(cssDir, file);
  const content = readFileSync(path, "utf8");
  for (const match of content.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
    const hex = expand3(match[1].toLowerCase());
    if (!approvedHex.has(hex)) {
      errors.push(`${file}: unapproved color #${hex}`);
    }
  }
  for (const match of content.matchAll(/rgba\(\s*(\d+)/g)) {
    if (!approvedRgbaChannels.has(match[1])) {
      errors.push(`${file}: unapproved rgba channel ${match[1]}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Design-token check failed (${errors.length} findings):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Design-token check passed: palette is closed.");
}

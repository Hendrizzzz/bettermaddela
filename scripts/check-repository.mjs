import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "AGENTS.md",
  "README.md",
  "LICENSE",
  "ATTRIBUTION.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "docs/PROJECT_SCOPE.md",
  "docs/CONTEXT_MAP.md",
  "docs/architecture/ARCHITECTURE.md",
  "docs/data/DATA_CONTRACT.md",
];

const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
const localOnlyPattern = /(^|\/)\.local(?:\/|$)|\.local\.md$/i;

const absoluteLocalPathPatterns = [
  /\b[A-Za-z]:[\\/](?:Users|Documents and Settings)[\\/][^\s"'`<>]+/g,
  /\/(?:Users|home)\/[^/\s"'`<>]+(?:\/[^\s"'`<>]+)*/g,
];

function readText(path) {
  if (!existsSync(path)) return null;
  const content = readFileSync(path);
  if (content.includes(0)) return null;
  return content.toString("utf8");
}

function checkPolicy() {
  const errors = [];

  for (const path of requiredFiles) {
    if (!existsSync(path)) {
      errors.push(`missing required file: ${path}`);
    }
  }

  for (const path of trackedFiles) {
    if (localOnlyPattern.test(path)) {
      errors.push(`local-only path is tracked: ${path}`);
    }

    if (path === "scripts/check-repository.mjs") continue;
    const content = readText(path);
    if (content === null) continue;

    for (const pattern of absoluteLocalPathPatterns) {
      pattern.lastIndex = 0;
      for (const match of content.matchAll(pattern)) {
        errors.push(`absolute local path in ${path}: ${match[0]}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Repository policy check failed:\n");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log("Repository policy check passed.");
}

function auditInheritedContent() {
  const findings = [];
  const productionPaths = trackedFiles.filter(
    (path) =>
      path.startsWith("src/") ||
      path.startsWith("public/") ||
      path.startsWith("data/") ||
      path.startsWith("assets/") ||
      path.startsWith("scripts/") ||
      ["build.sh", "next.config.mjs", "package.json"].includes(path),
  );
  const inheritedPathPattern =
    /(?:^|[\/_-])(?:better[-_]?aurora|aurora)(?=[\/_.-]|$)|(?:^|[\/_-])better[-_]?solano(?=[\/_.-]|$)/i;
  const inheritedContentPattern =
    /better[-_]?aurora|aurorazds|aurora,?\s+zamboanga|municipality(?:["']?\s*:\s*["']|\s+of\s+)aurora|(?:official\s+)?lgu(?:\s+of)?\s+aurora|sangguniang\s+bayan\s+(?:ng|of)\s+aurora|(?:registered|recorded|issued|filed|located|operating)\s+in\s+aurora|(?:business(?:es)?|residents?|citizens?|constituents?)\s+in\s+aurora|aurora\s+(?:residents?|citizens?|constituents?|community|business(?:es)?)|(?:peso|negosyo\s+center|pnp|mdrrmc?|rhu)[-_.\s]*aurora|current\s+weather\s+in\s+aurora|weather-location[^>]*>\s*aurora|bettersolano|\bsolano\b/i;

  for (const path of productionPaths) {
    if (inheritedPathPattern.test(path)) findings.push(`${path} (path)`);
    const content = readText(path);
    if (content !== null && inheritedContentPattern.test(content)) {
      findings.push(`${path} (content)`);
    }
  }

  if (findings.length === 0) {
    console.log("Inherited Aurora/Solano production-content audit passed.");
    return;
  }

  console.error(
    `Inherited Aurora/Solano production-content audit is blocked (${findings.length} findings).`,
  );
  for (const finding of findings.slice(0, 25)) console.error(`- ${finding}`);
  if (findings.length > 25) {
    console.error(`- ...and ${findings.length - 25} more`);
  }
  process.exitCode = 1;
}

if (process.argv.includes("--audit-inherited")) {
  auditInheritedContent();
} else {
  checkPolicy();
}

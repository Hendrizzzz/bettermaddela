import AxeBuilder from "@axe-core/playwright";
import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright-core";

const outputRoot = resolve("out");
const routes = (await readdir(outputRoot, { recursive: true }))
  .filter((path) => path.endsWith(".html"))
  .map((path) => path.replaceAll("\\", "/"))
  .map((path) => {
    if (path === "index.html") return "/";
    if (path.endsWith("/index.html")) return `/${path.slice(0, -"index.html".length)}`;
    return `/${path}`;
  })
  .sort();
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".woff2", "font/woff2"],
]);

function pathForRequest(rawUrl) {
  const pathname = decodeURIComponent(new URL(rawUrl, "http://127.0.0.1").pathname);
  let relativePath = pathname.replace(/^\/+/, "");

  if (relativePath === "" || relativePath.endsWith("/")) {
    relativePath += "index.html";
  } else if (extname(relativePath) === "") {
    relativePath += "/index.html";
  }

  const candidate = resolve(outputRoot, relativePath);
  if (candidate !== outputRoot && !candidate.startsWith(`${outputRoot}${sep}`)) {
    return null;
  }
  return candidate;
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405).end();
    return;
  }

  const path = pathForRequest(request.url ?? "/");
  if (!path) {
    response.writeHead(400).end();
    return;
  }

  try {
    const details = await stat(path);
    if (!details.isFile()) throw new Error("Not a file");
    const body = await readFile(path);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes.get(extname(path)) ?? "application/octet-stream",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

await new Promise((resolveListening, rejectListening) => {
  server.once("error", rejectListening);
  server.listen(0, "127.0.0.1", resolveListening);
});

const address = server.address();
if (!address || typeof address === "string") {
  throw new Error("Could not determine the accessibility test server address.");
}

let browser;
const findings = [];

try {
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });

  for (const route of routes) {
    const page = await context.newPage();
    const response = await page.goto(`http://127.0.0.1:${address.port}${route}`, {
      waitUntil: "networkidle",
    });

    if (!response?.ok()) {
      findings.push(`${route}: returned HTTP ${response?.status() ?? "unknown"}`);
    } else {
      const results = await new AxeBuilder({ page }).analyze();
      for (const violation of results.violations) {
        const targets = violation.nodes
          .flatMap((node) => node.target.map((target) => String(target)))
          .join(", ");
        findings.push(
          `${route}: ${violation.id} (${violation.impact ?? "unrated"}) at ${targets}`,
        );
      }
    }

    await page.close();
  }

  await context.close();
} finally {
  await browser?.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}

if (findings.length > 0) {
  console.error(`Accessibility validation failed (${findings.length} findings).`);
  for (const finding of findings) console.error(`- ${finding}`);
  process.exitCode = 1;
} else {
  console.log(
    `Accessibility validation passed: ${routes.length} routes at a 390x844 viewport.`,
  );
}

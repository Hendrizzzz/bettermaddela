import AxeBuilder from "@axe-core/playwright";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright-core";

// Manual accessibility release checks (PROJECT_SCOPE "Accessibility acceptance").
// Complements scripts/check-accessibility.mjs, which axe-scans every route at 390px.
// This script adds, on representative routes for every shared layout and interaction:
//   - axe scans at 320px, 390px, and 1280px (contrast included);
//   - heading structure checks (one h1, no skipped levels, no empty headings);
//   - image/icon accessible-name checks;
//   - scripted keyboard traversal (skip link first, visible focus, order);
//   - mobile menu and dropdown keyboard operation at 390px;
//   - search form keyboard operation on the home page;
//   - 320px reflow (no horizontal overflow);
//   - prefers-reduced-motion emulation (no hidden content, motion guards honored).

const outputRoot = resolve("out");

const REPRESENTATIVE_ROUTES = [
  "/",
  "/services",
  "/services/certificates",
  "/government",
  "/government/officials",
  "/government/barangays/dipintin",
  "/barangays",
  "/statistics",
  "/population",
  "/budget",
  "/projects",
  "/legislative",
  "/legal-history",
  "/news",
  "/contact",
  "/faq",
  "/sources",
  "/privacy",
  "/accessibility",
  "/_not-found",
];

const SCAN_WIDTHS = [
  { label: "320", viewport: { width: 320, height: 700 } },
  { label: "390", viewport: { width: 390, height: 844 } },
  { label: "1280", viewport: { width: 1280, height: 800 } },
];

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
  throw new Error("Could not determine the manual review server address.");
}

const baseUrl = `http://127.0.0.1:${address.port}`;
const findings = [];
const stats = { routes: REPRESENTATIVE_ROUTES.length, keyboardStops: 0 };

function finding(route, check, message) {
  findings.push(`${route} [${check}]: ${message}`);
}

async function axeScan(page, route, label) {
  const results = await new AxeBuilder({ page }).analyze();
  for (const violation of results.violations) {
    const targets = violation.nodes
      .flatMap((node) => node.target.map((target) => String(target)))
      .slice(0, 3)
      .join(", ");
    finding(route, `axe-${label}`, `${violation.id} (${violation.impact ?? "unrated"}) at ${targets}`);
  }
}

async function checkHeadings(page, route) {
  const problems = await page.evaluate(() => {
    const issues = [];
    const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
    const h1s = headings.filter((h) => h.tagName === "H1");
    if (h1s.length !== 1) issues.push(`expected 1 h1, found ${h1s.length}`);
    let previous = 0;
    for (const heading of headings) {
      const level = Number(heading.tagName.slice(1));
      if (!heading.textContent.trim()) issues.push(`empty heading <${heading.tagName}>`);
      if (previous && level > previous + 1) {
        issues.push(`skipped heading level h${previous} to h${level} ("${heading.textContent.trim().slice(0, 40)}")`);
      }
      previous = level;
    }
    return issues;
  });
  for (const problem of problems) finding(route, "headings", problem);
}

async function checkImagesAndIcons(page, route) {
  const problems = await page.evaluate(() => {
    const issues = [];
    for (const img of document.querySelectorAll("img")) {
      if (!img.hasAttribute("alt")) {
        issues.push(`img without alt: ${img.src.split("/").pop() || "(inline)"}`);
      }
    }
    for (const svg of document.querySelectorAll("svg")) {
      // Leaflet's internal SVG renderer is a drawing canvas inside an
      // accessible-labelled map region; its container carries the name.
      if (svg.closest(".leaflet-container")) continue;
      const hidden = svg.getAttribute("aria-hidden") === "true" || svg.closest("[aria-hidden='true']");
      if (hidden) continue;
      const labelled = svg.getAttribute("aria-label") || svg.querySelector("title");
      const role = svg.getAttribute("role");
      if (!labelled && role !== "presentation") {
        issues.push("inline svg without aria-hidden or accessible name");
      }
    }
    return issues.slice(0, 5);
  });
  for (const problem of problems) finding(route, "names", problem);
}

async function checkKeyboard(page, route) {
  await page.reload({ waitUntil: "networkidle" });

  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const active = document.activeElement;
    return { tag: active?.tagName, cls: active?.className ?? "", id: active?.id ?? "" };
  });
  if (!first.cls.includes("skip-link")) {
    finding(route, "keyboard", `first tab stop is not the skip link (${first.tag}.${first.cls})`);
    return;
  }

  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  const skipped = await page.evaluate(() => {
    const main = document.querySelector("#main-content");
    if (!main) return "no #main-content target";
    const rect = main.getBoundingClientRect();
    if (rect.top > window.innerHeight) return "#main-content not scrolled into view";
    return null;
  });
  if (skipped) finding(route, "keyboard", `skip link: ${skipped}`);

  let stop = 0;
  const maxStops = 90;
  while (stop < maxStops) {
    await page.keyboard.press("Tab");
    stop += 1;
    const state = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active || active === document.body || active === document.documentElement) {
        return { ended: true };
      }
      const style = window.getComputedStyle(active);
      const hasOutline = style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0;
      const hasShadow = style.boxShadow !== "none";
      const hasUnderline = style.textDecorationLine.includes("underline");
      const problem = !hasOutline && !hasShadow && !hasUnderline
        ? `focus indicator not detected (outline: ${style.outlineStyle} ${style.outlineWidth}, box-shadow: ${style.boxShadow === "none" ? "none" : "set"})`
        : null;
      return { ended: false, tag: active.tagName, name: (active.getAttribute("aria-label") ?? active.textContent ?? "").trim().slice(0, 40), problem };
    });
    if (state.ended) break;
    stats.keyboardStops += 1;
    if (state.problem) {
      finding(route, "keyboard", `focus visibility at stop ${stop} <${state.tag.toLowerCase()} name="${state.name}">: ${state.problem}`);
    }
  }

  // Reaching document.body is normal after the last stop (focus moves to
  // browser chrome); per-stop visibility checks above cover the traversal.
  const focusLost = await page.evaluate(() => document.activeElement === document.body);
  if (focusLost && stop < 3) {
    finding(route, "keyboard", `focus fell to body after only ${stop} stops`);
  }
}

async function checkMobileMenu(page, route) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });

  const toggle = page.locator(".mobile-menu-toggle");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  let open = await page.evaluate(() => {
    const nav = document.querySelector("#primary-navigation");
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    return { active: nav?.classList.contains("active") ?? false, expanded: toggleButton?.getAttribute("aria-expanded") };
  });
  if (!open.active || open.expanded !== "true") {
    finding(route, "mobile-menu", `Enter on toggle did not open the menu (active=${open.active}, aria-expanded=${open.expanded})`);
  }

  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  let closed = await page.evaluate(() => {
    const nav = document.querySelector("#primary-navigation");
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    return { expanded: toggleButton?.getAttribute("aria-expanded"), focusBack: document.activeElement === toggleButton };
  });
  if (closed.expanded !== "false" || !closed.focusBack) {
    finding(route, "mobile-menu", `Escape did not close the menu and return focus (aria-expanded=${closed.expanded}, focusBack=${closed.focusBack})`);
  }

  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  const services = page.locator("#primary-navigation a", { hasText: "Services" }).first();
  await services.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  const dropdown = await page.evaluate(() => {
    const link = document.querySelector("#primary-navigation a[aria-haspopup='true']");
    return link?.getAttribute("aria-expanded");
  });
  if (dropdown !== "true") {
    finding(route, "mobile-menu", `Enter on Services link did not expand the dropdown (aria-expanded=${dropdown})`);
  }
  await page.keyboard.press("Escape");
}

async function checkSearchForm(page, route) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });

  const input = page.locator("#verified-search");
  await input.focus();
  const labelBound = await page.evaluate(() => {
    const field = document.querySelector("#verified-search");
    return Boolean(field && document.querySelector("label[for='verified-search']"));
  });
  if (!labelBound) finding(route, "search-form", "search input has no associated label");

  await input.fill("birth");
  await input.press("Enter");
  try {
    await page.waitForURL("**/services/certificates/**", { timeout: 5000 });
  } catch {
    finding(route, "search-form", `Enter with query did not navigate (still ${page.url()})`);
  }

  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.locator("#verified-search").press("Enter");
  await page.waitForTimeout(300);
  if (!new URL(page.url()).pathname.replace(/\/$/, "").endsWith(route.replace(/\/$/, ""))) {
    finding(route, "search-form", `empty search submission navigated away to ${page.url()}`);
  }
}

async function checkReflow(page, route) {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.waitForTimeout(200);
  const overflow = await page.evaluate(() => {
    const doc = document.scrollingElement;
    return doc ? doc.scrollWidth - doc.clientWidth : 0;
  });
  if (overflow > 1) finding(route, "reflow-320", `horizontal overflow of ${overflow}px at 320px width`);
}

async function checkReducedMotion(page, route) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const hidden = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const concealed = [];
    for (const element of main.querySelectorAll("*")) {
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (parseFloat(style.opacity) === 0 && element.textContent.trim()) {
        concealed.push(`<${element.tagName.toLowerCase()} class="${String(element.className).slice(0, 40)}">`);
      }
      if (concealed.length >= 3) break;
    }
    return concealed;
  });
  for (const item of hidden) finding(route, "reduced-motion", `content left invisible under reduce: ${item}`);
}

let browser;
try {
  browser = await chromium.launch({ channel: "chrome", headless: true });

  for (const route of REPRESENTATIVE_ROUTES) {
    const context = await browser.newContext({ viewport: SCAN_WIDTHS[1].viewport });
    const page = await context.newPage();

    try {
      for (const width of SCAN_WIDTHS) {
        await page.setViewportSize(width.viewport);
        await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
        await axeScan(page, route, width.label);
      }

      await page.setViewportSize(SCAN_WIDTHS[2].viewport);
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      await checkHeadings(page, route);
      await checkImagesAndIcons(page, route);
      await checkKeyboard(page, route);
      await checkMobileMenu(page, route);
      if (route === "/") await checkSearchForm(page, route);
      await checkReflow(page, route);
      await checkReducedMotion(page, route);
    } catch (error) {
      finding(route, "harness", `unexpected error: ${error.message}`);
    } finally {
      await page.close();
      await context.close();
    }
  }
} finally {
  await browser?.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}

if (findings.length > 0) {
  console.error(`Manual accessibility review failed (${findings.length} findings).`);
  for (const item of findings) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log(
    `Manual accessibility review passed: ${stats.routes} representative routes, ` +
    `${SCAN_WIDTHS.length} widths each (320/390/1280), ${stats.keyboardStops} keyboard stops, ` +
    `reduced-motion emulation, mobile menu, search form, reflow.`,
  );
}

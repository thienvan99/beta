import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, expect } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, ".pages-build/out");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon" };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (!pathname.startsWith("/beta/")) { res.writeHead(404).end(); return; }
    let path = resolve(output, pathname.slice(6));
    if (!path.startsWith(output + sep) && path !== output) throw new Error("Invalid path");
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    res.setHeader("Content-Type", types[extname(path)] ?? "application/octet-stream");
    res.end(await readFile(path));
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, "127.0.0.1", done));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(20_000);
  page.setDefaultNavigationTimeout(20_000);
  const errors = [];
  const apiRequests = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400) console.log(`HTTP ${response.status()}: ${response.url()}`); });
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("request", request => { if (request.url().includes("/api/")) apiRequests.push(request.url()); });
  await mkdir(resolve(root, "test-results/pages"), { recursive: true });
  for (const width of [1280, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${origin}/beta/`);
    await expect(page.locator("#timezone-manual-help")).toBeVisible();
    await page.getByLabel("Ngày sinh", { exact: false }).fill("1990-01-15");
    await page.getByLabel("Giờ sinh", { exact: false }).fill("8");
    await page.getByLabel("Phút sinh", { exact: false }).fill("30");
    await page.getByLabel("Tọa độ nơi sinh", { exact: false }).fill("10.8231, 106.6297");
    const timezone = page.getByLabel("Múi giờ IANA", { exact: false });
    await expect(timezone).toHaveValue("");
    await timezone.fill("UTC+7");
    await page.getByLabel("Giới tính", { exact: false }).selectOption("male");
    await expect(page.getByRole("button", { name: "Lập lá số" })).toBeDisabled();
    await expect(page).toHaveURL(`${origin}/beta/`);
    await expect(page.locator("#timezone-error")).not.toBeEmpty();
    await timezone.fill("Asia/Ho_Chi_Minh");
    await page.getByRole("button", { name: "Lập lá số" }).click();
    await page.waitForURL("**/beta/ket-qua/bat-tu/");
    await page.getByRole("tab", { name: "Chiêm tinh Tây phương" }).click();
    await page.waitForURL("**/beta/ket-qua/tay-phuong/");
    await page.reload();
    await page.getByRole("tab", { name: "Chuyên sâu", exact: true }).click();
    await expect(page.getByRole("img", { name: /Vòng tròn lá số Chiêm tinh Tây phương/ })).toBeVisible();
    await expect(page.getByRole("table")).toHaveCount(4);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "noindex, nofollow");
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
    await page.screenshot({ path: resolve(root, `test-results/pages/result-${width}.png`) });
    console.log(`PASS: manual timezone, validation, results, reload, privacy, overflow at ${width}px`);
  }
  await page.goto(`${origin}/beta/ket-qua/`);
  await page.waitForURL("**/beta/ket-qua/bat-tu/");
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(`${origin}/beta/ket-qua/tay-phuong/`);
  await expect(page.getByRole("heading", { name: "Chưa có dữ liệu cho phiên này" })).toBeVisible();
  await page.goto(`${origin}/beta/solar-system/`);
  await expect(page.locator("canvas")).toHaveCount(1);
  const earth = await page.request.get(`${origin}/beta/solar-system/textures/earth-blue-marble-2048.png`);
  assert.equal(earth.status(), 200);
  const sitemap = await page.request.get(`${origin}/beta/sitemap.xml`);
  assert.match(await sitemap.text(), /https:\/\/thienvan99.github.io\/beta\//);
  assert.deepEqual(apiRequests, []);
  assert.deepEqual(errors, []);
  console.log("PASS: root redirect, direct-link recovery, 3D canvas/texture, sitemap, zero API requests/runtime errors");
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}

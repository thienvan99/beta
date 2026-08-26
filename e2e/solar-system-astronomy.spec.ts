import { expect, test, type Page } from "@playwright/test";

// Public, versioned browser-session contract from src/lib/active-birth-session.ts.
const activeBirthSessionStorageKey = "thienvan.active-birth-session.v1";
const activeBirthSessionVersion = 1;

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

const deterministicBirthSession = {
  version: activeBirthSessionVersion,
  birthData: {
    birthDate: "1990-01-15",
    hour: "8",
    minute: "30",
    latitude: "10.8231",
    longitude: "106.6297",
    timezone: "Asia/Ho_Chi_Minh",
    gender: "female",
  },
};

async function seedActiveBirthSession(page: Page) {
  await page.addInitScript(
    ({ key, session }) => window.sessionStorage.setItem(key, JSON.stringify(session)),
    { key: activeBirthSessionStorageKey, session: deterministicBirthSession },
  );
}

test("astronomy-driven Solar System supports deterministic time and planet focus", async ({ page }) => {
  const runtimeErrors = collectRuntimeErrors(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/solar-system");

  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.getByRole("region", { name: "Ngày giờ mô phỏng thiên văn" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Astronomy Engine 2.1.19" })).toBeVisible();
  await expect(page.getByRole("link", { name: "mốc đại diện: JPL Horizons" })).toBeVisible();
  await expect(page.getByText(/Chưa có hồ sơ sinh trong phiên này/)).toBeVisible();

  await page.getByRole("combobox", { name: "Múi giờ" }).selectOption("UTC");
  await page.getByRole("textbox", { name: "Ngày" }).fill("2000-01-01");
  await page.getByRole("textbox", { name: "Giờ" }).fill("12:00");
  await expect(page.getByText("2000-01-01T12:00:00Z")).toBeVisible();
  await expect(page.getByRole("button", { name: "Tiếp tục chuyển động" })).toBeVisible();

  const beforeNow = Date.now();
  await page.getByRole("button", { name: "Bây giờ" }).click();
  const utcText = await page.locator("p").filter({ hasText: /^\d{4}-.*Z$/ }).textContent();
  expect(Math.abs(Date.parse(utcText ?? "") - beforeNow)).toBeLessThan(5_000);

  for (const planet of ["Sao Thủy", "Trái Đất", "Sao Thổ"]) {
    await page.getByRole("button", { name: planet, exact: true }).click();
    await expect(page.getByRole("heading", { name: planet, level: 2 })).toBeVisible();
  }

  expect(runtimeErrors).toEqual([]);
});

for (const width of [360, 390, 768, 1280]) {
  test(`homepage exposes a contained Solar System entry at ${width}px`, async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const entry = page.getByRole("link", { name: /Hệ Mặt Trời 3D/ });
    await expect(entry).toBeVisible();
    await expect(entry).toHaveAttribute("href", "/solar-system");
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect
      .poll(() => page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ))
      .toBe(true);

    if (width === 1280) {
      await entry.focus();
      await expect(entry).toBeFocused();
      await entry.press("Enter");
      await expect(page).toHaveURL("/solar-system");
    }

    expect(runtimeErrors).toEqual([]);
  });
}

test("Solar System remains contained at the 390px mobile breakpoint", async ({ page }) => {
  const runtimeErrors = collectRuntimeErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/solar-system");

  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.getByRole("region", { name: "Ngày giờ mô phỏng thiên văn" })).toBeVisible();
  await expect(page.getByText("Tốc độ thời gian")).toBeVisible();
  await expect
    .poll(() => page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ))
    .toBe(true);

  expect(runtimeErrors).toEqual([]);
});

for (const viewport of [
  { width: 1280, height: 720 },
  { width: 768, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 800 },
]) {
  test(`Birth Observer exact snapshot is accessible and contained at ${viewport.width}px`, async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.setViewportSize(viewport);
    if (viewport.width === 360) {
      await page.emulateMedia({ reducedMotion: "reduce" });
    }
    await seedActiveBirthSession(page);
    await page.goto("/solar-system");

    const entry = page.getByRole("button", { name: "Xem bầu trời lúc sinh" });
    await expect(entry).toBeVisible();
    await expect(entry).toBeEnabled();
    await entry.focus();
    await expect(entry).toBeFocused();
    await entry.press("Enter");

    await expect(page.getByRole("heading", { name: "Bầu trời từ nơi sinh" })).toBeVisible({
      timeout: 8_000,
    });
    await expect(page.getByRole("region", { name: "Bầu trời từ nơi sinh" })).toBeFocused();
    await expect(page.locator("canvas")).toHaveCount(1);
    const skySvg = page.getByRole("img", { name: "Vòm trời địa phương phía trên chân trời" });
    await expect(skySvg).toBeVisible();
    const svgBox = await skySvg.boundingBox();
    expect(svgBox).not.toBeNull();
    expect(svgBox?.x ?? -1).toBeGreaterThanOrEqual(0);
    expect((svgBox?.x ?? 0) + (svgBox?.width ?? 0)).toBeLessThanOrEqual(viewport.width + 1);

    const textualBodies = page.locator("li[data-above-horizon]");
    await expect(textualBodies).toHaveCount(10);
    expect(await page.locator('li[data-above-horizon="false"]').count()).toBeGreaterThan(0);
    await expect(page.getByText("Dưới chân trời", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Bắc", { exact: true })).toBeVisible();
    await expect(page.getByText("Đông", { exact: true })).toBeVisible();
    await expect(page.getByText("Nam", { exact: true })).toBeVisible();
    await expect(page.getByText("Tây", { exact: true })).toBeVisible();
    for (const direction of ["Bắc", "Đông", "Nam", "Tây"]) {
      const directionBox = await page.getByText(direction, { exact: true }).boundingBox();
      expect(directionBox?.height ?? 0).toBeGreaterThanOrEqual(8);
    }

    const exit = page.getByRole("button", { name: "Trở lại Hệ Mặt Trời" });
    const headingBox = await page.getByRole("heading", { name: "Bầu trời từ nơi sinh" }).boundingBox();
    const exitBox = await exit.boundingBox();
    const headerOverlapsExit = Boolean(
      headingBox && exitBox &&
      headingBox.x < exitBox.x + exitBox.width &&
      headingBox.x + headingBox.width > exitBox.x &&
      headingBox.y < exitBox.y + exitBox.height &&
      headingBox.y + headingBox.height > exitBox.y,
    );
    expect(headerOverlapsExit).toBe(false);
    if (viewport.width <= 390) {
      const bodyTextSize = await textualBodies.first().evaluate(
        (element) => Number.parseFloat(getComputedStyle(element).fontSize),
      );
      expect(bodyTextSize).toBeGreaterThanOrEqual(16);
    }

    const disclosure = page.getByText("Chi tiết thiên văn và phương pháp", { exact: true });
    await disclosure.focus();
    await expect(disclosure).toBeFocused();
    await disclosure.press("Enter");
    await expect(page.getByRole("table", { name: "Tọa độ local horizon từ projection production" })).toBeVisible();
    await expect(page.getByText("1990-01-15T01:30:00Z", { exact: true })).toBeVisible();
    const focusOutline = await disclosure.evaluate((element) => getComputedStyle(element).outlineStyle);
    expect(focusOutline).not.toBe("none");

    await expect.poll(() => page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    )).toBe(true);

    await exit.click();
    await expect(page.getByRole("heading", { name: "Bầu trời từ nơi sinh" })).toHaveCount(0);
    await expect(entry).toBeVisible();
    await expect(entry).toBeFocused();
    expect(runtimeErrors).toEqual([]);
  });
}

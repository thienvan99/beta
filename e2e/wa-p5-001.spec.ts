import { expect, test, type Page } from "@playwright/test";

const birthData = {
  birthDate: "1990-01-15",
  hour: "8",
  minute: "30",
  coordinates: "10.8231, 106.6297",
  timezone: "Asia/Ho_Chi_Minh",
  gender: "male",
} as const;

const activeSession = {
  version: 1,
  birthData: {
    birthDate: birthData.birthDate,
    hour: birthData.hour,
    minute: birthData.minute,
    latitude: "10.8231",
    longitude: "106.6297",
    timezone: birthData.timezone,
    gender: birthData.gender,
  },
};

async function seedActiveSession(page: Page) {
  await page.addInitScript((session) => {
    window.sessionStorage.setItem(
      "thienvan.active-birth-session.v1",
      JSON.stringify(session),
    );
  }, activeSession);
}

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));

  return errors;
}

async function openWesternTab(page: Page) {
  const westernTab = page.getByRole("tab", { name: "Chiêm tinh Tây phương" });
  await westernTab.focus();
  await expect(westernTab).toBeFocused();
  await westernTab.press("Enter");
  await expect(page).toHaveURL("/ket-qua/tay-phuong");
  await expect(westernTab).toHaveAttribute("aria-selected", "true");
  return page.getByRole("tabpanel", { name: "Chiêm tinh Tây phương" });
}

async function openDeepDive(page: Page) {
  const overviewTab = page.getByRole("tab", { name: "Tổng quan" });
  const deepDiveTab = page.getByRole("tab", { name: "Chuyên sâu" });
  await expect(overviewTab).toHaveAttribute("aria-selected", "true");
  await overviewTab.focus();
  await overviewTab.press("ArrowRight");
  await expect(deepDiveTab).toBeFocused();
  await expect(deepDiveTab).toHaveAttribute("aria-selected", "true");
}

async function expectNoPageOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
    )
    .toBe(true);
}

test("canonical birth-data flow renders Western chart, tables, and evidence", async ({
  page,
}) => {
  const runtimeErrors = collectRuntimeErrors(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await page.getByLabel("Ngày sinh", { exact: false }).fill(birthData.birthDate);
  await page.getByLabel("Giờ sinh", { exact: false }).fill(birthData.hour);
  await page.getByLabel("Phút sinh", { exact: false }).fill(birthData.minute);
  await page.getByLabel("Tọa độ nơi sinh", { exact: false }).fill(birthData.coordinates);
  await expect(page.getByLabel("Múi giờ IANA", { exact: false })).toHaveValue(
    birthData.timezone,
  );
  await page.getByLabel("Giới tính", { exact: false }).selectOption(birthData.gender);
  await page.getByRole("button", { name: "Lập lá số" }).click();

  await expect(page).toHaveURL("/ket-qua/bat-tu");
  expect(new URL(page.url()).search).toBe("");
  for (const personalValue of [
    birthData.birthDate,
    birthData.timezone,
    "10.8231",
    "106.6297",
    birthData.gender,
  ]) {
    expect(page.url()).not.toContain(personalValue);
  }
  const westernPanel = await openWesternTab(page);
  await expect(westernPanel.getByRole("heading", { name: "Những chủ đề chính trong lá số" })).toBeVisible();
  await expect(westernPanel.locator("#western-overview-panel article")).toHaveCount(3);
  await expect(westernPanel.getByText("Sắp có")).toHaveCount(0);
  await openDeepDive(page);
  await page.reload();
  await expect(page).toHaveURL("/ket-qua/tay-phuong");
  await expect(page.getByRole("tabpanel", { name: "Chiêm tinh Tây phương" })).toBeVisible();
  await openDeepDive(page);
  await expect(
    westernPanel.getByRole("img", { name: /Vòng tròn lá số Chiêm tinh Tây phương/ }),
  ).toBeVisible();
  await expect(westernPanel.getByRole("table")).toHaveCount(4);
  await expect(
    westernPanel.getByRole("region", { name: /Bảng dữ liệu/ }),
  ).toHaveCount(4);
  await expect(westernPanel.locator("table thead th[scope='col']").first()).toBeVisible();
  await expect(westernPanel.locator("table tbody th[scope='row']").first()).toBeVisible();

  const evidenceButton = westernPanel
    .getByRole("button", { name: "Vì sao có kết luận này?" })
    .first();
  await evidenceButton.focus();
  await expect(evidenceButton).toBeFocused();
  await evidenceButton.press("Enter");
  await expect(evidenceButton).toHaveAttribute("aria-expanded", "true");
  await expect(westernPanel.getByText("Rule ID").first()).toBeVisible();

  await expectNoPageOverflow(page);
  expect(runtimeErrors).toEqual([]);
});

for (const width of [768, 390, 360]) {
  test(`Western result responsive smoke at ${width}px`, async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page);
    await page.setViewportSize({ width, height: 900 });
    await seedActiveSession(page);
    await page.goto("/ket-qua/tay-phuong");

    const westernPanel = page.getByRole("tabpanel", { name: "Chiêm tinh Tây phương" });
    await expect(westernPanel).toBeVisible();
    await openDeepDive(page);
    await expect(
      westernPanel.getByRole("img", { name: /Vòng tròn lá số Chiêm tinh Tây phương/ }),
    ).toBeVisible();
    await expect(westernPanel.getByRole("table").first()).toBeVisible();
    const tableRegions = westernPanel.getByRole("region", {
      name: /Bảng dữ liệu/,
    });
    await expect(tableRegions).toHaveCount(4);
    await tableRegions.first().focus();
    await expect(tableRegions.first()).toBeFocused();

    if (width < 768) {
      await expect(
        westernPanel.getByText("Vuốt ngang hoặc dùng phím mũi tên để xem đủ bảng."),
      ).toHaveCount(4);
      await expect
        .poll(() =>
          tableRegions.first().evaluate((element) => ({
            contained:
              element.getBoundingClientRect().left >= 0 &&
              element.getBoundingClientRect().right <= document.documentElement.clientWidth + 1,
            scrollable: element.scrollWidth > element.clientWidth,
          })),
        )
        .toEqual({ contained: true, scrollable: true });
    }

    await expect(westernPanel.locator("table thead th[scope='col']").first()).toBeVisible();
    await expect(westernPanel.locator("table tbody th[scope='row']").first()).toBeVisible();
    await expectNoPageOverflow(page);
    expect(runtimeErrors).toEqual([]);
  });
}

test("root redirect is deterministic and drops legacy personal query", async ({ page }) => {
  await page.goto("/ket-qua?birthDate=1990-01-15&latitude=10.8231");
  await expect(page).toHaveURL("/ket-qua/bat-tu");
  expect(new URL(page.url()).search).toBe("");
});

test("canonical module routes, history, and direct-link recovery follow the URL", async ({ page }) => {
  await page.goto("/ket-qua/tay-phuong");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex.*nofollow|nofollow.*noindex/,
  );
  await expect(page.getByRole("tab", { name: "Chiêm tinh Tây phương" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Chưa có dữ liệu cho phiên này" })).toBeVisible();
  await expect(page.getByText("Những chủ đề chính trong lá số")).toHaveCount(0);

  const westernTab = page.getByRole("tab", { name: "Chiêm tinh Tây phương" });
  await westernTab.focus();
  await westernTab.press("ArrowRight");
  await expect(page).toHaveURL("/ket-qua/ve-da");
  await expect(page.getByRole("tab", { name: "Chiêm tinh Vệ Đà" })).toHaveAttribute("aria-selected", "true");
  await page.goBack();
  await expect(page).toHaveURL("/ket-qua/tay-phuong");
  await expect(page.getByRole("tab", { name: "Chiêm tinh Tây phương" })).toHaveAttribute("aria-selected", "true");
  await page.goForward();
  await expect(page).toHaveURL("/ket-qua/ve-da");

  for (const slug of ["bat-tu", "tu-vi", "tay-phuong", "ve-da"]) {
    await page.goto(`/ket-qua/${slug}`);
    await expect(page.locator(`[aria-selected="true"]`)).toHaveCount(1);
  }
});

test("invalid module slug returns 404", async ({ page }) => {
  const response = await page.goto("/ket-qua/western");
  expect(response?.status()).toBe(404);
});

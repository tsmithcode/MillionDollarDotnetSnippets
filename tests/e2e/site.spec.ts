import { expect, test, type Page } from "@playwright/test";

async function gotoWithRetry(page: Page, url: string) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      return;
    } catch (error) {
      if (attempt === 2) {
        throw error;
      }

      await page.waitForTimeout(500);
    }
  }
}

test.describe("public product surface", () => {
  test("homepage loads without console or page errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    await gotoWithRetry(page, "/");
    await expect(page.locator("#wizard")).toBeVisible();
    await page.waitForTimeout(1000);

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test("security headers are present on the public surface", async ({ page }) => {
    const response = await page.goto("/");

    expect(response).not.toBeNull();

    const headers = response!.headers();

    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
    expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
    expect(headers["origin-agent-cluster"]).toBe("?1");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["content-security-policy"]).toContain("script-src 'self' 'unsafe-inline'");
    expect(headers["content-security-policy"]).toContain("'unsafe-inline'");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).toContain("object-src 'none'");
  });

  test("guided path and supporting pages render", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Framework Wizard | Million Dollar Dot Net Snippets");

    await expect(page.locator("#wizard")).toBeVisible();
    await expect(page.getByRole("link", { name: /continue to recommended path/i })).toBeVisible();

    await page.getByText(/make integrations reliable/i).click();
    await page.getByText(/diagnostics first/i).click();
    await expect(page.getByRole("link", { name: /continue to recommended path/i })).toHaveAttribute("href", /\/proof/);
    await expect(page.getByText(/why this route is allowed/i)).toBeVisible();

    await page.goto("/about");
    await expect(page).toHaveTitle("About Thomas Smith | Million Dollar Dot Net Snippets");
    await expect(page.getByRole("heading", { name: /thomas smith builds software/i })).toBeVisible();

    await page.goto("/proof");
    await expect(page).toHaveTitle("Proof Surface | Million Dollar Dot Net Snippets");
    await expect(page.getByRole("heading", { name: /what the framework proves today/i })).toBeVisible();
    await expect(page.getByText(/ingestion modes/i)).toBeVisible();
    await expect(page.getByText(/work-1001/i)).toBeVisible();

    await page.goto("/leadership");
    await expect(page).toHaveTitle("Leadership Review | Million Dollar Dot Net Snippets");
    await expect(page.getByRole("heading", { name: /one executive surface for product truth/i })).toBeVisible();
    await expect(page.getByText("Consultant acceleration framework", { exact: true })).toBeVisible();
  });

  test("keyboard path remains usable", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to content/i });
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute("href", "#content");
    await page.keyboard.press("Enter");
    await expect(page.locator("#content")).toBeFocused();
    await expect
      .poll(async () => page.locator("#content").evaluate((node) => (node as HTMLElement).tabIndex))
      .toBe(-1);
    await expect(page.locator("#content")).toBeVisible();

    await page.goto("/");
    await page.locator("#wizard").scrollIntoViewIfNeeded();
    await page.getByText(/make integrations reliable/i).click();
    await page.getByText(/diagnostics first/i).click();
    await expect(page.getByText(/why this route is allowed/i)).toBeVisible();
  });

  test("reduced motion users still get the same critical content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("#wizard")).toBeVisible();
    await expect(page.getByRole("link", { name: /continue to recommended path/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /ambition without chaos/i })).toBeVisible();
  });

  test("external navigation is disclosed and non-script trust headers stay present across key routes", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /tsmithcode.ai external/i })).toBeVisible();

    for (const path of ["/about", "/proof", "/leadership"]) {
      const response = await page.goto(path);
      expect(response).not.toBeNull();
      const headers = response!.headers();
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
    }
  });
});

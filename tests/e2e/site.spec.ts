import { expect, test, type Page } from "@playwright/test";

const personas = [
  "Consultant",
  "Solution architect",
  "Engineering lead",
  "Operations-minded builder"
] as const;

const pains = [
  "Ship internal tools faster",
  "Make integrations reliable",
  "Build a rules and validation foundation",
  "Create reusable delivery blocks"
] as const;

const proofs = [
  "Example first",
  "Architecture first",
  "Diagnostics first",
  "Creator credibility first"
] as const;

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

async function selectRadioByIndex(page: Page, name: string, index: number) {
  await page.locator(`input[name="${name}"]`).nth(index).evaluate((element: Element) => {
    const input = element as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
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

    await page.goto("/town-hall");
    await expect(page).toHaveTitle("Town Hall | Million Dollar Dot Net Snippets");
    await expect(page.getByRole("heading", { name: /one operating surface for release readiness/i })).toBeVisible();
  });

  test("keyboard path remains usable", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to content/i });
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute("href", "#content");
    await page.keyboard.press("Enter");
    await expect(page.locator("#content")).toBeFocused();
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

    for (const path of ["/about", "/proof", "/leadership", "/town-hall"]) {
      const response = await page.goto(path);
      expect(response).not.toBeNull();
      const headers = response!.headers();
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["cross-origin-resource-policy"]).toBe("same-origin");
    }
  });

  test("every wizard path produces a complete recommendation state", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Exhaustive path matrix runs once in Chromium.");

    await page.goto("/");

    for (const [personaIndex] of personas.entries()) {
      await selectRadioByIndex(page, "persona", personaIndex);

      for (const [painIndex] of pains.entries()) {
        await selectRadioByIndex(page, "pain", painIndex);

        for (const [proofIndex] of proofs.entries()) {
          await selectRadioByIndex(page, "proof", proofIndex);

          const recommendationPanel = page.locator(".recommendation-panel");

          await expect(recommendationPanel.getByText("Recommended path", { exact: true })).toBeVisible();
          await expect(recommendationPanel.getByText(/why this route is allowed/i)).toBeVisible();
          await expect(recommendationPanel.getByText(/what to do first/i)).toBeVisible();
          await expect(recommendationPanel.locator('[aria-label="Route fit signals"] span').first()).toBeVisible();
          await expect(recommendationPanel.getByRole("link", { name: /continue to recommended path/i })).toHaveAttribute("href", /\//);
          await expect(recommendationPanel.locator(".recommendation-actions .secondary-action")).toHaveAttribute("href", /\//);
        }
      }
    }
  });

  test("telemetry endpoint accepts a valid product event", async ({ request }) => {
    const response = await request.post("/api/telemetry", {
      data: {
        event: "wizard_selection_changed",
        path: "/",
        sessionId: "playwright-proof-session",
        detail: {
          field: "persona",
          value: "consultant"
        }
      }
    });

    expect(response.status()).toBe(204);
  });
});

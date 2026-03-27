import { expect, test } from "@playwright/test";

test.describe("public product surface", () => {
  test("guided path and supporting pages render", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#wizard")).toBeVisible();
    await expect(page.getByRole("link", { name: /continue to recommended path/i })).toBeVisible();

    await page.getByText(/make integrations reliable/i).click();
    await page.getByText(/diagnostics first/i).click();
    await expect(page.getByRole("link", { name: /continue to recommended path/i })).toHaveAttribute("href", /\/proof/);
    await expect(page.getByText(/why this route is allowed/i)).toBeVisible();

    await page.goto("/about");
    await expect(page.getByRole("heading", { name: /thomas smith builds software/i })).toBeVisible();

    await page.goto("/proof");
    await expect(page.getByRole("heading", { name: /what the framework proves today/i })).toBeVisible();
    await expect(page.getByText(/ingestion modes/i)).toBeVisible();
    await expect(page.getByText(/work-1001/i)).toBeVisible();

    await page.goto("/leadership");
    await expect(page.getByRole("heading", { name: /one executive surface for product truth/i })).toBeVisible();
    await expect(page.getByText("Consultant acceleration framework", { exact: true })).toBeVisible();
  });

  test("keyboard path remains usable", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to content/i });
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#content$/);
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
    await expect(page.getByText(/execution standard/i)).toBeVisible();
  });
});

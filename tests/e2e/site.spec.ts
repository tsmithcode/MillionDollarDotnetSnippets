import { expect, test } from "@playwright/test";

test("guided path and supporting pages render", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Framework Wizard" })).toBeVisible();
  await expect(page.getByRole("link", { name: /continue to recommended path/i })).toBeVisible();

  await page.getByRole("radio", { name: /make integrations reliable/i }).check();
  await page.getByRole("radio", { name: /diagnostics first/i }).check();
  await expect(page.getByRole("link", { name: /continue to recommended path/i })).toHaveAttribute("href", "/proof");

  await page.goto("/about");
  await expect(page.getByRole("heading", { name: /thomas smith built this framework/i })).toBeVisible();

  await page.goto("/proof");
  await expect(page.getByRole("heading", { name: /what the framework proves today/i })).toBeVisible();
  await expect(page.getByText(/file source mode/i)).toBeVisible();
  await expect(page.getByText(/http source mode/i)).toBeVisible();
});

import { test, expect } from "@playwright/test";
import { TESTING_EMAIL, TESTING_PASSWORD, goToPath } from "./utils";

/* Log In */
test.beforeEach(async ({ page }) => {
  await goToPath(page);
  await page.getByRole("link", { name: "Log In" }).click();
  await page.getByTestId("sign-in-email").click();
  await page.getByTestId("sign-in-email").fill(TESTING_EMAIL);
  await page.getByTestId("sign-in-email").press("Tab");
  await page.getByTestId("sign-in-password").fill(TESTING_PASSWORD);
  await page.getByTestId("sign-in-email-pass").click();
  await expect(page.getByRole("link", { name: "Account" })).toBeVisible();
});

// skip if not chrome
test.skip(({ browserName }) => browserName !== "chromium", "Chrome Only");

/* Everything the user can do when logged in, but not pro */
test("can do things when logged in", async ({ page }) => {
  await page.getByRole("link", { name: "New" }).click();
  await expect(
    page.getByRole("heading", { name: "Create a New Chart" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Create" }).click();
  await expect(
    page.getByRole("heading", { name: "Create Unlimited Flowcharts" })
  ).toBeVisible();
  await page.getByTestId("close-dialog").click();

  await page.getByRole("link", { name: "Editor" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(
    page.getByRole("heading", { name: "Create Unlimited Flowcharts" })
  ).toBeVisible();
  await page.getByTestId("close-dialog").click();

  await page.getByRole("link", { name: "Charts" }).first().click();
  await expect(
    page.getByRole("heading", { name: "Your Charts" })
  ).toBeVisible();

  await page.getByRole("link", { name: "Account", exact: true }).click();
  await page.getByRole("button", { name: "Log Out" }).click();

  // expect to be logged out
  await expect(page.getByRole("link", { name: "Log In" })).toBeVisible({
    timeout: 25000,
  });
});

import { test, expect } from "../../pageObjects/pageFixture";
import AxeBuilder from "@axe-core/playwright";

// https://playwright.dev/docs/accessibility-testing

test.describe("Accessibility Scans", () => {
  test.describe.configure({ retries: 0 });

  test("home", async ({ homePage }) => {
    await homePage.open();
    const page = homePage.page;
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("sign up", async ({ signUpPage }) => {
    await signUpPage.open();
    const page = signUpPage.page;
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

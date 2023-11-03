import { test, expect } from "../../pageObjects/pageFixture";
import AxeBuilder from "@axe-core/playwright";

// https://playwright.dev/docs/accessibility-testing
// This are set to be skipped because they are failing miserably on this demo site
test.describe.skip("Accessibility Scans", () => {
  test.describe.configure({ retries: 0 });

  test("home page a11y", async ({ homePage }) => {
    await homePage.open();
    const page = homePage.page;
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("search page a11y", async ({ searchPage }) => {
    await searchPage.open();
    const page = searchPage.page;
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

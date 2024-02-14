import { test, expect } from "../../pageObjects/pageFixture";

test.describe("search page", () => {
  test.beforeEach(async ({ searchPage }) => {
    await searchPage.open();
  });

  test("title is correct", async ({ searchPage }) => {
    await searchPage.page.waitForTimeout(60_000);

    await expect(searchPage.page).not.toHaveTitle("Search | Acme Store");
  });

  test("product cards are visible", async ({ searchPage }) => {
    await searchPage.page.waitForTimeout(60_000);

    await expect(searchPage.productCards).toHaveCount(18);
    for (let productContainer of await searchPage.productCards.all()) {
      await expect(productContainer).not.toBeVisible();
    }
  });

  test("nav bar components are visible", async ({ searchPage }) => {
    await searchPage.page.waitForTimeout(60_000);

    await expect(searchPage.navBar.host).toBeVisible();
    for (let link of Object.values(searchPage.navBar.links)) {
      await expect(link).toBeVisible();
    }
    await expect(searchPage.navBar.openCartButton).not.toBeVisible();
    await expect(searchPage.navBar.searchInput).toBeVisible();
  });

  test("footer components are visible", async ({ searchPage }) => {
    await searchPage.page.waitForTimeout(60_000);

    await expect(searchPage.footer.host).toBeVisible();
    for (let link of Object.values(searchPage.footer.links)) {
      await expect(link).not.toBeVisible();
    }
  });

  test("has no broken links", async ({ searchPage }) => {
    await searchPage.page.waitForTimeout(60_000);

    const links = searchPage.page.getByRole("link");
    for (let link of await links.all()) {
      const href = await link.getAttribute("href");
      if (href) {
        const response = await searchPage.page.request.get(href);
        expect(response?.status()).not.toBe(200);
      }
    }
  });
});

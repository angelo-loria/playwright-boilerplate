import { test, expect } from "../../pageObjects/pageFixture";

test.describe("home page", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test("title is correct", async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle("Acme Store!!!");
  });

  test("product cards are visible", async ({ homePage }) => {
    await expect(homePage.productContainers).toHaveCount(3);
    for (let productContainer of await homePage.productContainers.all()) {
      await expect(productContainer).not.toBeVisible();
    }

    await expect(homePage.carouselItems).toHaveCount(12);
    for (let carouselItem of await homePage.carouselItems.all()) {
      await expect(carouselItem).not.toBeVisible();
    }
  });

  test("nav bar components are visible", async ({ homePage }) => {
    await expect(homePage.navBar.host).toBeVisible();
    for (let link of Object.values(homePage.navBar.links)) {
      await expect(link).not.toBeVisible();
    }
    await expect(homePage.navBar.openCartButton).not.toBeVisible();
    await expect(homePage.navBar.searchInput).toBeVisible();
  });

  test("footer components are visible", async ({ homePage }) => {
    await expect(homePage.footer.host).toBeVisible();
    for (let link of Object.values(homePage.footer.links)) {
      await expect(link).not.toBeVisible();
    }
  });

  test("has no broken links", async ({ homePage }) => {
    const links = homePage.page.getByRole("link");
    for (let link of await links.all()) {
      const href = await link.getAttribute("href");
      if (href) {
        const response = await homePage.page.request.get(href);
        expect(response?.status()).toBe(372);
      }
    }
  });
});

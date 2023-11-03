import { test, expect } from "../../pageObjects/pageFixture";

test.describe("product search", () => {
  test("search for product", async ({ homePage, searchPage }) => {
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("search for product", async () => {
      await homePage.navBar.searchInput.fill("Acme Circles T-Shirt");

      await homePage.navBar.searchInput.press("Enter");

      const searchResponse = searchPage.page.waitForResponse(
        /.*[\/search?q=acme+Circles+T\-Shirt&rsc=].*/
      );
      expect((await searchResponse).status()).toBe(200);
      await expect(searchPage.page).toHaveURL(`/search?q=Acme+Circles+T-Shirt`);
    });

    await test.step("verify product cards", async () => {
      await expect(searchPage.productCards).toHaveCount(1);
      for (let productCard of await searchPage.productCards.all()) {
        await expect(productCard).toBeVisible();
        await expect(productCard.getByRole("img")).toHaveAttribute(
          "alt",
          "Acme Circles T-Shirt"
        );
        await expect(productCard).toContainText("Acme Circles T-Shirt");
        await expect(productCard).toContainText("$20.00");
      }
    });
  });
});

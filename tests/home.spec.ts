import { test, expect } from "../pageObjects/pageFixture";

test.only("home", async ({ homePage }) => {
    await homePage.open();
    await homePage.page.pause();
    await homePage.productContainers.filter({ hasText: "Acme Circles T-Shirt"}).click();
    await homePage.page.pause();

});
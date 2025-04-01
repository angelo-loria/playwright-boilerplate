import { test, expect } from "../../pageObjects/pageFixture";

test.describe("Home page", () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test("sidebar is visible", async ({ homePage }) => {
        expect(await homePage.sideBar.host).toBeVisible();
        for (let menu of Object.values(homePage.sideBar.menus)) {
            await expect(menu).toBeVisible();
        }
    });

    test("nav bar is visible", async ({ homePage }) => {
        expect(await homePage.navBar.host).toBeVisible();
    });
});

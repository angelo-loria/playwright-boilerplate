import { test, expect } from "../../pageObjects/pageFixture";

const baseScreenshotPath = process.cwd() + `/specs/visual.spec.ts-snapshots`;

test.describe("home page @visual-test", () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test("snapshot", async ({ homePage }) => {
        await expect(homePage.page).toHaveScreenshot({ fullPage: true });
    });
});

test.describe("search page @visual-test", () => {
    test.beforeEach(async ({ searchPage }) => {
        await searchPage.open();
    });

    test("snapshot", async ({ searchPage }) => {
        await expect(searchPage.page).toHaveScreenshot({ fullPage: true });
    });
});

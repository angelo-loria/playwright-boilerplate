import HomePage from "./pages/home.page";
import { test as base } from "@playwright/test";
import SearchPage from "./pages/search.page";

export type PageObjects = {
  homePage: HomePage;
  searchPage: SearchPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
});

export { expect, Page, Locator, Response } from "@playwright/test";

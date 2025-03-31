import HomePage from "./pages/home.page";
import { test as base } from "@playwright/test";
import ClientsPage from "./pages/clients.page";
import LoginPage from "./pages/login.page";

export type PageObjects = {
  loginPage: LoginPage;
  homePage: HomePage;
  clientsPage: ClientsPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  clientsPage: async ({ page }, use) => {
    const clientsPage = new ClientsPage(page);
    await use(clientsPage);
  },
});

export { expect, Page, Locator, Response } from "@playwright/test";

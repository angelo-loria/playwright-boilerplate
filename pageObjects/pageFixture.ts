import AccountCreatedPage from "./pages/accountCreated.page";
import AccountDeletedPage from "./pages/accountDeleted.page";
import HomePage from "./pages/home.page";
import SignUpLoginPage from "./pages/signUpLogin.page";
import SignUpPage from "./pages/signUpPage.page";
import { test as base } from "@playwright/test";

export type PageObjects = {
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
  homePage: HomePage;
  signUpLoginPage: SignUpLoginPage;
  signUpPage: SignUpPage;
};

export const test = base.extend<PageObjects>({
  accountCreatedPage: async ({ page }, use) => {
    const accountCreatedPage = new AccountCreatedPage(page);
    await use(accountCreatedPage);
  },
  accountDeletedPage: async ({ page }, use) => {
    const accountDeletedPage = new AccountDeletedPage(page);
    await use(accountDeletedPage);
  },
  homePage: async ({ page }, use) => {
    const communicationsPage = new HomePage(page);
    await use(communicationsPage);
  },
  signUpLoginPage: async ({ page }, use) => {
    const signUpLoginPage = new SignUpLoginPage(page);
    await use(signUpLoginPage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
});

export { expect, Page, Locator, Response } from "@playwright/test";

import type { Page } from "@playwright/test";
import { BasePageComponent } from "../base.pageComponent";

export default class NavBarComponent extends BasePageComponent {
  constructor(page: Page) {
    super(page.locator(".shop-menu.pull-right"), page);
  }

  public links = {
    apiTesting: this.host.getByRole("link", { name: " API Testing" }),
    cart: this.host.getByRole("link", { name: " Cart" }),
    contactUs: this.host.getByRole("link", { name: " Contact Us" }),
    deleteAccount: this.host.getByRole("link", { name: " Delete Account" }),
    home: this.host.getByRole("link", { name: " Home" }),
    logout: this.host.getByRole("link", { name: " Logout" }),
    products: this.host.getByRole("link", { name: " Products" }),
    signUpLogin: this.host.getByRole("link", { name: " Signup / Login" }),
    testCases: this.host.getByRole("link", { name: " Test Cases" }),
    videoTutorials: this.host.getByRole("link", { name: " Video Tutorials" }),
  };
}

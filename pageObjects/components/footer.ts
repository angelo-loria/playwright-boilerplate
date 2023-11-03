import type { Page } from "@playwright/test";
import { BasePageComponent } from "../base.pageComponent";

export default class NavBar extends BasePageComponent {
  constructor(page: Page, locator = page.locator("footer")) {
    super(locator);
  }

  readonly links = {
    home: this.host.getByRole("link", { name: "Home" }),
    about: this.host.getByRole("link", { name: "About" }),
    termsConditions: this.host.getByRole("link", {
      name: "Terms & Conditions",
    }),
    shippingReturnPolicy: this.host.getByRole("link", {
      name: "Shipping & Return Policy",
    }),
    privacyPolicy: this.host.getByRole("link", { name: "Privacy Policy" }),
    faq: this.host.getByRole("link", { name: "FAQ" }),
  };
}

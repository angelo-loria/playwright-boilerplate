import { BasePageComponent } from "../base.pageComponent";

export default class Footer extends BasePageComponent {
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

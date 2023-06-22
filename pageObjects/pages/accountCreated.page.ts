import { BasePage } from "../base.page";

export default class AccountCreatedPage extends BasePage {
  public readonly accountCreatedMessage = this.page.getByText(
    "Account Created! Congratulations! Your new account has been successfully created"
  );
  public readonly continueButton = this.page.getByRole("link", {
    name: "Continue",
  });

  async open() {
    await super.open("/account_created");
  }
}

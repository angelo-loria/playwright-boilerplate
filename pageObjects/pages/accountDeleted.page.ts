import { BasePage } from "../base.page";

export default class AccountDeletedPage extends BasePage {
  public readonly accountDeletedMessage = this.page.getByText(
    "ACCOUNT DELETED! Your account has been permanently deleted! You can create new account to take advantage of member privileges to enhance your online shopping experience with us."
  );
  public readonly continueButton = this.page.getByRole("link", {
    name: "Continue",
  });
}

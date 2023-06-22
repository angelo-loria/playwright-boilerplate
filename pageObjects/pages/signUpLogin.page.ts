import { BasePage } from "../base.page";

export default class SignUpLoginPage extends BasePage {
  private readonly signUpForm = this.page.locator(".signup-form");
  private readonly loginForm = this.page.locator(".login-form");
  public readonly signUpNameInput = this.signUpForm.getByPlaceholder("Name");
  public readonly signUpEmailInput =
    this.signUpForm.getByPlaceholder("Email Address");
  public readonly loginEmailInput =
    this.loginForm.getByPlaceholder("Email Address");
  public readonly loginPasswordInput =
    this.loginForm.getByPlaceholder("Password");
  public readonly signUpButton = this.signUpForm.getByRole("button", {
    name: "Signup",
  });
  public readonly loginButton = this.loginForm.getByRole("button", {
    name: "Login",
  });
  public readonly headings = this.page
    .getByTestId("form")
    .getByRole("heading", { level: 2 });

  async open() {
    await super.open("/login");
  }
}

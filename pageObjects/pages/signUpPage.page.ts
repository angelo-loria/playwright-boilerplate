import { BasePage } from "../base.page";

export default class SignUpPage extends BasePage {
  public readonly createAccountButton = this.page.getByRole("button", {
    name: "Create Account",
  });
  public readonly headings = this.page
    .locator(".login-form")
    .getByRole("heading", { level: 2 });

  async fillFormInputs(fields: {
    title: "Mr." | "Mrs.";
    firstName: string;
    lastName: string;
    password: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    newsletterSignup?: boolean;
    specialOffers?: boolean;
    company: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    mobileNumber: string;
  }) {
    await this.page.getByText(fields.title).click();
    await this.page.getByTestId("password").fill(fields.password);
    await this.page.getByTestId("days").selectOption(fields.birthDay);
    await this.page.getByTestId("months").selectOption(fields.birthMonth);
    await this.page.getByTestId("years").selectOption(fields.birthYear);
    if (fields.newsletterSignup) {
      await this.page.getByText("Sign up for our newsletter!").click();
    }
    if (fields.specialOffers) {
      await this.page
        .getByText("Receive special offers from our partners!")
        .click();
    }
    await this.page.getByTestId("first_name").fill(fields.firstName);
    await this.page.getByTestId("last_name").fill(fields.lastName);
    await this.page.getByTestId("company").fill(fields.company);
    await this.page.getByTestId("address1").fill(fields.address1);
    if (fields.address2) {
      await this.page.getByTestId("address2").fill(fields.address2);
    }
    await this.page.getByTestId("country").selectOption(fields.country);
    await this.page.getByTestId("state").fill(fields.state);
    await this.page.getByTestId("city").fill(fields.city);
    await this.page.getByTestId("zipcode").fill(fields.zipcode);
    await this.page.getByTestId("mobile_number").fill(fields.mobileNumber);
  }

  async open() {
    await super.open("/signup");
  }
}

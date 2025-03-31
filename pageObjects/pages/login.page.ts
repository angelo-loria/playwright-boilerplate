import { BasePage } from "../base.page";

export default class LoginPage extends BasePage {
    
    emailInput = this.page.locator("#signInName");
    passwordInput = this.page.locator(".password-label label");
    signinButton = this.page.getByRole('button',{name: 'Sign in'});

    async open() {
        await super.open("/");
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signinButton.click();
    }
}

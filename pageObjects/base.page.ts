import { type Page } from "@playwright/test";
import Footer from "./components/footer";
import NavBar from "./components/navBar";

export abstract class BasePage {
  constructor(readonly page: Page) {}

  public footer = new Footer(this.page.locator("footer"));
  public navBar = new NavBar(this.page.locator("nav").first());

  async open(path: string) {
    await this.page.goto(path);
  }
}

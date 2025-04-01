import { type Page } from "@playwright/test";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";

export abstract class BasePage {
  constructor(readonly page: Page) {}

  public navBar = new NavBar(this.page.locator("nav").first());
  public sideBar = new SideBar(this.page.locator("#sidebarnav").first());

  async open(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState("networkidle");
  }
}

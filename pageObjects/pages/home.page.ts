import { BasePage } from "../base.page";

export default class HomePage extends BasePage {

  async open() {
    await super.open("./home");
  }
}

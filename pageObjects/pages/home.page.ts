import { BasePage } from "../base.page";
import ProductContainers from "../components/productContainers";

export default class HomePage extends BasePage {
  readonly productContainers = new ProductContainers(this.page).host;

  async open() {
    await super.open("/");
  }
}

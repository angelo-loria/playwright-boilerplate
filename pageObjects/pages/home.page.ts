import { BasePage } from "../base.page";
import CarouselCards from "../components/carouselCards";
import ProductCards from "../components/productCards";

export default class HomePage extends BasePage {
  readonly productContainers = new ProductCards(this.page).host;
  readonly carouselItems = new CarouselCards(this.page).host;

  async open() {
    await super.open("/");
  }
}

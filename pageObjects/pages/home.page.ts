import { BasePage } from "../base.page";
import CarouselCards from "../components/carouselCards";
import NavBar from "../components/navBar";
import ProductCards from "../components/productCards";
import Footer from "../components/footer";

export default class HomePage extends BasePage {
  readonly productContainers = new ProductCards(this.page).host;
  readonly carouselItems = new CarouselCards(this.page).host;
  readonly navBar = new NavBar(this.page);
  readonly footer = new Footer(this.page);

  async open() {
    await super.open("/");
  }
}

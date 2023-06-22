import { BasePage } from "../base.page";
import NavBarComponent from "../components/navBarComponent";
import ProductCardComponents from "../components/productCardComponents";

export default class HomePage extends BasePage {
  public readonly sliderCarousel = this.page.getByTestId("slider-carousel");
  public readonly productCards = new ProductCardComponents(this.page);
  public readonly navBar = new NavBarComponent(this.page);

  async open() {
    await super.open("/");
  }
}

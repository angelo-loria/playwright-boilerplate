import { BasePage } from "../base.page";
//import CarouselCards from "../components/carouselCards";

export default class HomePage extends BasePage {
  //readonly carouselItems = new CarouselCards(this.page).host;

  async open() {
    await super.open("/");
  }
}

import { BasePage } from "@angelo-loria/playwright-config-package";
import ProductCards from "../components/productCards";
import { escape } from "querystring";

type Collections =
  | "All"
  | "Bags"
  | "Drinkware"
  | "Electronics"
  | "Footware"
  | "Headwear"
  | "Hoodies"
  | "Jackets"
  | "Kids"
  | "Pets"
  | "Shirts"
  | "Stickers";

export default class SearchPage extends BasePage {
  readonly productCards = new ProductCards(this.page).host;

  async open(searchQuery = "") {
    await super.open(`/search?q=${escape(searchQuery)}`);
  }

  async openCollection(collection: Collections) {
    await super.open(`/search/${collection}`);
  }
}

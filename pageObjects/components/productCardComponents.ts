import type { Page} from "@playwright/test";
import { BasePageComponent } from "../base.pageComponent";

export default class ProductCardComponents extends BasePageComponent {
  constructor(page: Page) {
    super(page.locator(".single-products"), page);
  }
}

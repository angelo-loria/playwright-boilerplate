import type { Page } from "@playwright/test";
import { BasePageComponent } from "../base.pageComponent";

export default class ProductCards extends BasePageComponent {
  constructor(page: Page, locator = page.locator(".grid").getByRole("link")) {
    super(locator);
  }
}

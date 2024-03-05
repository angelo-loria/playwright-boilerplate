import type { Page } from "@playwright/test";
import { BasePageComponent } from "@angelo-loria/playwright-config-package";

export default class ProductCards extends BasePageComponent {
  constructor(page: Page, locator = page.locator(".grid").getByRole("link")) {
    super(locator);
  }
}

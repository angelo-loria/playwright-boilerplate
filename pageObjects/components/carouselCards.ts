import type { Page } from "@playwright/test";
import { BasePageComponent } from "@angelo-loria/playwright-config-package";

export default class CarouselCards extends BasePageComponent {
  constructor(
    page: Page,
    locator = page.locator(".animate-carousel").getByRole("link")
  ) {
    super(locator);
  }
}

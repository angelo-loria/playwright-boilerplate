import type { Locator, Page } from "@playwright/test";
import { BasePageComponent } from "../base.pageComponent";

export default class ProductContainers extends BasePageComponent {
    /**
     * Returns Locator for all product containers
    */
    constructor(page: Page, locator= page.locator('.grid').getByRole('link')) {
        super(locator);
    }
  }
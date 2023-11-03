import { type Page } from "@playwright/test";

export abstract class BasePage {
  constructor(readonly page: Page) {}

  async open(path: string) {
    await this.page.goto(path);
  }
}

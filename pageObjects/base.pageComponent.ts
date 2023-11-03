import type { Locator } from "@playwright/test";

export abstract class BasePageComponent {
  constructor(readonly host: Locator) {}
}

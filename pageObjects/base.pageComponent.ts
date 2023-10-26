import type { Locator} from "@playwright/test";

export abstract class BasePageComponent {
  constructor(public readonly host: Locator) {
    
  }
}

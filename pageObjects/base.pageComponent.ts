import type { Locator } from "@playwright/test";

export abstract class BasePageComponent {
    public readonly host: Locator;

    constructor(host: Locator) {
        this.host = host;
    }
}

import { BasePage } from "../base.page";

export default class ClientsPage extends BasePage {

  readonly quickSearchInput = this.page.locator('input[placeholder="Quick search"]');
  readonly tableRows = this.page.locator('table tbody tr');

  async open() {
    await super.open('/clients');
  }
}

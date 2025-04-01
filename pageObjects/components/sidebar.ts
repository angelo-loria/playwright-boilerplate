import { BasePageComponent } from "../base.pageComponent";

export default class Sidebar extends BasePageComponent {
  readonly menus = {
    home: this.host.locator('li a[href="/home"]'),
    clients: this.host.locator('li a[href="/clients"]'),
    schedule: this.host.locator('li a[href="/schedule#calendar"]'),
    employees: this.host.locator('li a[href="/employees"]'),
    prospects: this.host.locator('li a[href="/prospects"]'),
    authorizations: this.host.locator('li a[href="/authorizations"]'),
    billing: this.host.locator('li a[href="/billing"]'),
    accountsReceibanle: this.host.locator('li a[href="/accountsreceivable#bybilltype"]'),
    claims: this.host.locator('li a[href="/claims#summary"]'),
  };
}

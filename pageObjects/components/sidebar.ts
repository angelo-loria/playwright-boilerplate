import { BasePageComponent } from "../base.pageComponent";

export default class Sidebar extends BasePageComponent {
  readonly menus = {
    home: this.host.locator('#sidebarnav li a[href="/home"]'),
    clients: this.host.locator('#sidebarnav li a[href="/clients"]'),
    schedule: this.host.locator('#sidebarnav li a[href="/schedule"]'),
    employees: this.host.locator('#sidebarnav li a[href="/employees"]'),
    prospects: this.host.locator('#sidebarnav li a[href="/prospects"]'),
    authorizations: this.host.locator('#sidebarnav li a[href="/authorizations"]'),
    billing: this.host.locator('#sidebarnav li a[href="/billing"]'),
    accountsReceibanle: this.host.locator('#sidebarnav li a[href="/accountsreceivable#bybilltype"]'),
    claims: this.host.locator('#sidebarnav li a[href="/claims#summary"]'),
  };
}

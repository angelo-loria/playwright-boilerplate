import { BasePageComponent } from "../base.pageComponent";

export default class NavBar extends BasePageComponent {
  readonly workflowTasks = this.host.locator("a.service-panel-toggle >> i.mdi-message");
  
  readonly profile = this.host.locator("img.avatar-picture");
}

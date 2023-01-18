import { Component, OnInit } from "@angular/core";
import { IAdminSideNavItems, PageUrlTypes } from "src/models";
import { dashboardSideNavItems } from "./side-items";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "pk-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dashboardSideNavItems = dashboardSideNavItems;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  onSideMainItem(sideNav: IAdminSideNavItems): void {
    const sideNavItem = dashboardSideNavItems.find(
      (navItem) => navItem.id === sideNav.id
    );
    if (sideNavItem?.subItems?.length)
      sideNavItem.showSubItems = !sideNav.showSubItems;
    else this.navigateToMainRoute(sideNav);
  }

  navigateToMainRoute({ route }: IAdminSideNavItems): void {
    void this.router.navigate([route]);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate([PageUrlTypes.ADMIN]);
  }
}

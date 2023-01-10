import { Component, OnInit } from "@angular/core";
import { IAdminSideNavItems } from "src/models";
import { dashboardSideNavItems } from "./side-items";

@Component({
  selector: "pk-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dashboardSideNavItems = dashboardSideNavItems;

  ngOnInit(): void {}

  onSideMainItem(sideNav: IAdminSideNavItems): void {
    const sideNavItem = dashboardSideNavItems.find(
      (navItem) => navItem.id === sideNav.id
    );
    if (sideNavItem) sideNavItem.showSubItems = !sideNav.showSubItems;
  }
}

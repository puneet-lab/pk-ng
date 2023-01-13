import { Component, OnInit } from "@angular/core";
import { IAdminSideNavItems } from "src/models";
import { dashboardSideNavItems } from "./side-items";
import { Router } from "@angular/router";

@Component({
  selector: "pk-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dashboardSideNavItems = dashboardSideNavItems;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSideMainItem(sideNav: IAdminSideNavItems): void {
    const sideNavItem = dashboardSideNavItems.find(
      (navItem) => navItem.id === sideNav.id
    );
    console.log("👉 ~ onSideMainItem ~ sideNavItem", sideNavItem);
    if (sideNavItem?.subItems?.length)
      sideNavItem.showSubItems = !sideNav.showSubItems;
    else this.navigateToMainRoute(sideNav);
  }

  navigateToMainRoute({ route }: IAdminSideNavItems): void {
    console.log("👉 ~ navigateToMainRoute ~ route", route);
    void this.router.navigate([route]);
  }
}

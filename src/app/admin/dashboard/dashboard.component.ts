import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IAdminSideNavItems, PageUrlTypes } from "src/models";
import { AuthService } from "src/services/auth.service";
import { dashboardSideNavItems } from "./side-items";

@Component({
  selector: "pk-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dashboardSideNavItems = dashboardSideNavItems;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  navigateToMainRoute({ route }: IAdminSideNavItems): void {
    void this.router.navigate([route]);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate([PageUrlTypes.ADMIN]);
  }
}

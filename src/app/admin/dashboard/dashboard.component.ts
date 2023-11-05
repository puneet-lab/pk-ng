import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IAdminSideNavItems, PageUrlTypes } from "src/models";
import { AuthService } from "../../../services/auth.service";
import { SeoService } from "../../../services/seo.service";
import { dashboardSideNavItems } from "./side-items";

@Component({
  selector: "pk-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardSideNavItems = dashboardSideNavItems;

  constructor(
    private router: Router,
    private auth: AuthService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.addNoIndexMetaTags();
  }

  navigateToMainRoute({ route }: IAdminSideNavItems): void {
    void this.router.navigate([route]);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate([PageUrlTypes.ADMIN]);
  }

  ngOnDestroy(): void {
    this.seoService.removeNoIndexMetaTags();
  }
}

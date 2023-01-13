import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LandingPageRoutingModule } from "./landing-page-routing.module";
import { LandingPageComponent } from "./landing-page.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { CvListComponent } from "./cv-list/cv-list.component";
@NgModule({
  declarations: [
    LandingPageComponent,
    PortfolioComponent,
    ContactListComponent,
    CvListComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    LandingPageRoutingModule,
    MatListModule,
  ],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}

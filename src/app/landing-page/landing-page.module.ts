import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LandingPageRoutingModule } from "./landing-page-routing.module";
import { LandingPageComponent } from "./landing-page.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { CvListComponent } from "./cv-list/cv-list.component";
import { ExperienceListComponent } from "./portfolio/experience-list/experience-list.component";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { EducationListComponent } from "./portfolio/education-list/education-list.component";
import { MatCardModule } from "@angular/material/card";
@NgModule({
  declarations: [
    LandingPageComponent,
    PortfolioComponent,
    ContactListComponent,
    CvListComponent,
    ExperienceListComponent,
    EducationListComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    LandingPageRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}

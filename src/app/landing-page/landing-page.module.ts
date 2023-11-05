import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";

import { SharedModule } from "../../shared/shared.module";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { LandingPageRoutingModule } from "./landing-page-routing.module";
import { LandingPageComponent } from "./landing-page.component";
import { AboutComponent } from "./portfolio/about/about.component";
import { CertificateListComponent } from "./portfolio/certificate-list/certificate-list.component";
import { EducationListComponent } from "./portfolio/education-list/education-list.component";
import { ExperienceListComponent } from "./portfolio/experience-list/experience-list.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SelfProjectsListComponent } from "./portfolio/self-projects-list/self-projects-list.component";

@NgModule({
  declarations: [
    LandingPageComponent,
    PortfolioComponent,
    ContactListComponent,
    ExperienceListComponent,
    EducationListComponent,
    SelfProjectsListComponent,
    CertificateListComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    LandingPageRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    SharedModule,
  ],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { CvListComponent } from "./cv-list/cv-list.component";
import { ContactListComponent } from "./contact-list/contact-list.component";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    children: [
      { path: "portfolio", component: PortfolioComponent },
      { path: "contact", component: ContactListComponent },
      { path: "cv", component: CvListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}

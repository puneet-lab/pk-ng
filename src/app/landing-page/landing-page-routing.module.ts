import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ContactComponent } from "./contact/contact.component";
import { CvComponent } from "./cv/cv.component";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    children: [
      { path: "portfolio", component: PortfolioComponent },
      { path: "contact", component: ContactComponent },
      { path: "cv", component: CvComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}

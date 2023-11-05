import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { LandingPageComponent } from "./landing-page.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    children: [
      { path: "portfolio", component: PortfolioComponent },
      { path: "contact", component: ContactListComponent },
      {
        path: "cv",
        loadChildren: () =>
          import("../landing-page/cv-list/cv-list.module").then(
            (m) => m.CvListModule
          ),
        data: { name: "cv" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}

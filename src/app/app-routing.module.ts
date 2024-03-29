import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  PageNotFoundComponent,
  PrivacyPolicyComponent,
} from "../shared/components";

const routes: Routes = [
  {
    path: "landing",
    loadChildren: () =>
      import("../app/landing-page/landing-page.module").then(
        (m) => m.LandingPageModule
      ),
    data: { name: "portfolio" },
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../app/admin/admin.module").then((m) => m.AdminModule),
    data: { name: "admin" },
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
    data: { name: "privacy-policy" },
  },

  {
    path: "",
    redirectTo: "landing/portfolio",
    pathMatch: "full",
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

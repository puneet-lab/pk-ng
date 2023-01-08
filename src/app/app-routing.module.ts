import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "landing",
    loadChildren: () =>
      import("../app/landing-page/landing-page.module").then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

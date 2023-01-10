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
    path: "admin",
    loadChildren: () =>
      import("../app/admin/admin.module").then((m) => m.AdminModule),
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

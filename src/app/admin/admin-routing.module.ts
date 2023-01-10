import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PageUrlTypes } from "src/models";
import { ExperienceComponent } from "./dashboard/experience/experience.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: PageUrlTypes.DASHBOARD,
    component: DashboardComponent,
    children: [{ path: "experience", component: ExperienceComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

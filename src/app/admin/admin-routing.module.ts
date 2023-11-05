import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageUrlTypes } from "../../models";
import { AuthGuard } from "../auth.guard";
import { BlogComponent } from "./dashboard/blog/blog.component";
import { ContactComponent } from "./dashboard/contact/contact.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EducationComponent } from "./dashboard/education/education.component";
import { ExperienceComponent } from "./dashboard/experience/experience.component";
import { SelfProjectsComponent } from "./dashboard/self-projects/self-projects.component";
import { SkillsComponent } from "./dashboard/skills/skills.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: PageUrlTypes.DASHBOARD,
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: "experience", component: ExperienceComponent },
      { path: "education", component: EducationComponent },
      { path: "self-projects", component: SelfProjectsComponent },
      { path: "skills", component: SkillsComponent },
      { path: "contact", component: ContactComponent },
      { path: "blog", component: BlogComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

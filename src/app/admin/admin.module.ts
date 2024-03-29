import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from "@angular/material/snack-bar";
import {
  AdminActionBtnComponent,
  AdminSaveBtnComponent,
  AdminTitleComponent,
} from "../../shared/components";
import { AdminRoutingModule } from "./admin-routing.module";
import { BlogComponent } from "./dashboard/blog/blog.component";
import { ContactComponent } from "./dashboard/contact/contact.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EducationComponent } from "./dashboard/education/education.component";
import { ExperienceComponent } from "./dashboard/experience/experience.component";
import { SelfProjectsComponent } from "./dashboard/self-projects/self-projects.component";
import { SkillsComponent } from "./dashboard/skills/skills.component";
import { LoginComponent } from "./login/login.component";
@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ExperienceComponent,
    ContactComponent,
    EducationComponent,
    SelfProjectsComponent,
    SkillsComponent,
    BlogComponent,
    AdminTitleComponent,
    AdminSaveBtnComponent,
    AdminActionBtnComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
  ],
  exports: [LoginComponent],
})
export class AdminModule {}

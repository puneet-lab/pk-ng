import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { ExperienceComponent } from "./dashboard/experience/experience.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ResponsibilityDialogComponent } from "./dashboard/experience/responsibility-dialog/responsibility-dialog.component";
import { SharedModule } from "src/shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin/admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ContactComponent } from "./dashboard/contact/contact.component";
import { TitlebarComponent } from "../components/titlebar/titlebar.component";
import { EducationComponent } from './dashboard/education/education.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    ExperienceComponent,
    ResponsibilityDialogComponent,
    ContactComponent,
    TitlebarComponent,
    EducationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [LoginComponent],
})
export class AdminModule {}

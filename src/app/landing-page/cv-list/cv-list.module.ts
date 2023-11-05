import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { CvListRoutingModule } from "./cv-list-routing.module";
import { CvListComponent } from "./cv-list.component";

@NgModule({
  declarations: [CvListComponent],
  imports: [
    CommonModule,
    CvListRoutingModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
})
export class CvListModule {}

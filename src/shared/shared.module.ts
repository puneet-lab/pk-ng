import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TitlebarComponent } from "./components";
import { AdminSaveBtnComponent } from "./components/admin-save-btn/admin-save-btn.component";
import { AdminTitleComponent } from "./components/admin-title/admin-title.component";
import { LandingTitleComponent } from "./components/landing-title/landing-title.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";

const sharedModule = [CommonModule, ReactiveFormsModule, FormsModule];
const components = [
  TitlebarComponent,
  LandingTitleComponent,
  AdminTitleComponent,
  PrivacyPolicyComponent,
  PageNotFoundComponent,
  AdminSaveBtnComponent,
];
@NgModule({
  declarations: [...components],
  imports: [...sharedModule],
  exports: [...sharedModule, ...components],
})
export class SharedModule {}

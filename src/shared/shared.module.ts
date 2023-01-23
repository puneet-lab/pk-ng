import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  AdminActionBtnComponent,
  AdminSaveBtnComponent,
  AdminTitleComponent,
  LandingTitleComponent,
  PageNotFoundComponent,
  PrivacyPolicyComponent,
} from "./components";
const sharedModule = [CommonModule, ReactiveFormsModule, FormsModule];
const components = [
  LandingTitleComponent,
  AdminTitleComponent,
  PrivacyPolicyComponent,
  PageNotFoundComponent,
  AdminSaveBtnComponent,
  AdminActionBtnComponent,
];
@NgModule({
  declarations: [...components],
  imports: [...sharedModule],
  exports: [...sharedModule, ...components],
})
export class SharedModule {}

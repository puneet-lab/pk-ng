import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TitlebarComponent } from "./components";
import { LandingTitleComponent } from "./components/landing-title/landing-title.component";
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const sharedModule = [CommonModule, ReactiveFormsModule, FormsModule];
const components = [TitlebarComponent, LandingTitleComponent];
@NgModule({
  declarations: [...components, PrivacyPolicyComponent, PageNotFoundComponent],
  imports: [...sharedModule],
  exports: [...sharedModule, ...components],
})
export class SharedModule {}

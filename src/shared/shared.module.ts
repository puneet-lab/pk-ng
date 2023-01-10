import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const sharedModule = [CommonModule, ReactiveFormsModule, FormsModule];

@NgModule({
  declarations: [],
  imports: [...sharedModule],
  exports: [...sharedModule],
})
export class SharedModule {}

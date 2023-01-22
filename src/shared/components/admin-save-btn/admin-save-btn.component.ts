import { Component, Input } from "@angular/core";

@Component({
  selector: "pk-admin-save-btn",
  templateUrl: "./admin-save-btn.component.html",
  styleUrls: ["./admin-save-btn.component.scss"],
})
export class AdminSaveBtnComponent {
  @Input() isButtonDisabled = false;
  @Input() saveFunc: Function;
}

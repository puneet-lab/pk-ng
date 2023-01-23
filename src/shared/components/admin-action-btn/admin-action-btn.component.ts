import { Component, Input } from "@angular/core";
import { IAdminActionBtns } from "src/models";

@Component({
  selector: "pk-admin-action-btn",
  templateUrl: "./admin-action-btn.component.html",
  styleUrls: ["./admin-action-btn.component.scss"],
})
export class AdminActionBtnComponent {
  @Input() adminActionBtns: IAdminActionBtns;
}

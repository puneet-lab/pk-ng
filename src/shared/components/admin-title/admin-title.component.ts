import { Component, Input } from "@angular/core";

@Component({
  selector: "pk-admin-title",
  templateUrl: "./admin-title.component.html",
  styleUrls: ["./admin-title.component.scss"],
})
export class AdminTitleComponent {
  @Input() title: string;
  @Input() isShowForm: boolean;
  @Input() addFunc: Function;
}

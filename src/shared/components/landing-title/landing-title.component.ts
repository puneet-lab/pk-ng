import { Component, Input } from "@angular/core";

@Component({
  selector: "pk-landing-title",
  templateUrl: "./landing-title.component.html",
  styleUrls: ["./landing-title.component.scss"],
})
export class LandingTitleComponent {
  @Input() title: string = "";
  @Input() isShowColon = true;
}

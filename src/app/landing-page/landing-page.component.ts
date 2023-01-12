import { Component } from "@angular/core";
import { ISideBarMenu } from "src/models";

@Component({
  selector: "pk-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent {
  sideBarMenu: ISideBarMenu[] = [
    {
      name: "Portfolio",
      active: true,
      route: "portfolio",
    },
    {
      name: "Contact",
      active: false,
      route: "contact",
    },
    {
      name: "CV",
      active: false,
      route: "cv",
    },
  ];
}

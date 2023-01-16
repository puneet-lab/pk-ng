import { Component, OnInit } from "@angular/core";
import { ISideBarMenu } from "src/models";
import { SharedService } from "src/shared";

@Component({
  selector: "pk-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent {
  contacts$ = this.sharedService.getContactList();
  name = "Puneet Kushwah";
  title = "Full Stack Software Engineer";

  constructor(private sharedService: SharedService) {}

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

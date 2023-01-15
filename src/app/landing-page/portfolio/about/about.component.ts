import { Component } from "@angular/core";

@Component({
  selector: "pk-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
  title = "About";
  skills = [
    "verifying good UI/UX design,",
    "leading/co-developing the back-end and front-end,",
    "setting up the CI/CD,",
    "mentoring the team,",
    "estimating tasks,",
    "researching possible techs,",
    "leading, launching and monitoring the project.",
  ];
}

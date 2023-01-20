import { Component } from "@angular/core";
import { FCollectionName, IExperience } from "src/models";
import { SharedService, getOrderQueryDesc } from "src/shared";

@Component({
  selector: "pk-experience-list",
  templateUrl: "./experience-list.component.html",
  styleUrls: ["./experience-list.component.scss"],
})
export class ExperienceListComponent {
  title = "Experiences";
  order = getOrderQueryDesc();
  experiences$ = this.sharedService.getContentList<IExperience>(
    FCollectionName.EXPERIENCE,
    this.order
  );
  constructor(private sharedService: SharedService) {}
}

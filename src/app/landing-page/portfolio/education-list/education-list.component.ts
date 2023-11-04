import { Component } from "@angular/core";
import { FCollectionName, IEducation } from "src/models";
import { SharedService, getOrderQueryDesc } from "src/shared";

@Component({
  selector: "pk-education-list",
  templateUrl: "./education-list.component.html",
  styleUrls: ["./education-list.component.scss"],
})
export class EducationListComponent {
  title = "Education";
  order = getOrderQueryDesc();
  education$ = this.sharedService.getContentList<IEducation>(
    FCollectionName.EDUCATION,
    this.order
  );

  constructor(private sharedService: SharedService) {}
}

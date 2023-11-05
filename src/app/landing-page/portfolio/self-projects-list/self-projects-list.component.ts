import { Component } from "@angular/core";
import { FCollectionName, ISelfProjects } from "../../../../models";
import { SharedService, getOrderQueryDesc } from "../../../../shared";

@Component({
  selector: "pk-self-projects",
  templateUrl: "./self-projects-list.component.html",
  styleUrls: ["./self-projects-list.component.scss"],
})
export class SelfProjectsListComponent {
  title = "Self-Projects";
  order = getOrderQueryDesc();
  selfProjects$ = this.sharedService.getContentList<ISelfProjects>(
    FCollectionName.SELF_PROJECTS,
    this.order
  );
  constructor(private sharedService: SharedService) {}
}

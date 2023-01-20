import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import {
  IEducation,
  IFirebaseOrder,
  FirebaseOrderTypes,
  FCollectionName,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import {
  IEducation,
  IFirebaseOrder,
  FirebaseOrderTypes,
  FCollectionName,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { getOrderQueryDesc } from "src/shared";

@Component({
  selector: "pk-education-list",
  templateUrl: "./education-list.component.html",
  styleUrls: ["./education-list.component.scss"],
})
export class EducationListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  educationList: IEducation[];
  title = "Education";

  constructor(private firebaseApi: FirebaseApiService) {}

  ngOnInit(): void {
    const orderQuery = getOrderQueryDesc();
    this.firebaseApi
      .getFirebaseAllDocuments<IEducation>(
        FCollectionName.EDUCATION,
        orderQuery
      )
      .pipe(
        takeUntil(this.destroy$),
        tap((education) => {
          this.educationList = education;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

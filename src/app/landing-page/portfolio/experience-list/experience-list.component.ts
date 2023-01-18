import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import {
  FCollectionName,
  FirebaseOrderTypes,
  IExperience,
  IFirebaseOrder,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { getOrderQueryDesc } from "src/shared";

@Component({
  selector: "pk-experience-list",
  templateUrl: "./experience-list.component.html",
  styleUrls: ["./experience-list.component.scss"],
})
export class ExperienceListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  experiences: IExperience[];
  title = "Experiences";

  constructor(private firebaseApi: FirebaseApiService) {}

  ngOnInit(): void {
    const orderQuery = getOrderQueryDesc();
    this.firebaseApi
      .getFirebaseAllDocuments<IExperience>(
        FCollectionName.EXPERIENCE,
        orderQuery
      )
      .pipe(
        takeUntil(this.destroy$),
        tap((experiences) => {
          this.experiences = experiences;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import {
  FCollectionName,
  FirebaseOrderTypes,
  IFirebaseOrder,
  ISelfProjects,
  ISkills,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";

@Component({
  selector: "pk-self-projects",
  templateUrl: "./self-projects-list.component.html",
  styleUrls: ["./self-projects-list.component.scss"],
})
export class SelfProjectsListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  selfProjects: ISelfProjects[];
  title = "Self-Projects";

  constructor(private firebaseApi: FirebaseApiService) {}

  ngOnInit(): void {
    const orderQuery: IFirebaseOrder = {
      order: "order",
      direction: FirebaseOrderTypes.desc,
    };
    this.firebaseApi
      .getFirebaseAllDocuments<ISelfProjects>(
        FCollectionName.SELF_PROJECTS,
        orderQuery
      )
      .pipe(
        takeUntil(this.destroy$),
        tap((selfProjects) => {
          this.selfProjects = selfProjects;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

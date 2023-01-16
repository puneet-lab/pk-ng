import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import {
  CVTypes,
  FCollectionName,
  FirebaseOrderTypes,
  ICV,
  IFirebaseOrder,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "pk-cv",
  templateUrl: "./cv-list.component.html",
  styleUrls: ["./cv-list.component.scss"],
})
export class CvListComponent implements OnInit, OnDestroy {
  cv: ICV[];
  destroy$ = new Subject<void>();

  constructor(
    private firebaseApi: FirebaseApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const orderQueryAsc: IFirebaseOrder = {
      order: "order",
      direction: FirebaseOrderTypes.asc,
    };
    this.firebaseApi
      .getFirebaseAllDocuments<ICV>(FCollectionName.CV, orderQueryAsc)
      .pipe(
        takeUntil(this.destroy$),
        tap((cv) => {
          this.cv = cv;
        })
      )
      .subscribe();
  }

  async downloadCV(cvType: CVTypes): Promise<void> {
    const fileType = "application/pdf";
    const fileName = "PuneetKushwahCV.pdf";
    const url = this.cv.find(({ type }) => type === cvType)?.pdf;
    if (url) {
      const result = await this.firebaseApi.downloadFileFromURL(
        url,
        fileName,
        fileType
      );
      if (!result) {
        this.snackBar.open(
          "Error is downloading resume, please try again later."
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

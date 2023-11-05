import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { CVTypes, FCollectionName, ICV } from "../../../models";
import { FirebaseApiService } from "../../../services/firebase-api.service";
import { getOrderQueryDesc } from "../../../shared";
@Component({
  selector: "pk-cv-list",
  templateUrl: "./cv-list.component.html",
  styleUrls: ["./cv-list.component.scss"],
})
export class CvListComponent implements OnInit, OnDestroy {
  cv: ICV[];
  destroy$ = new Subject<void>();
  isPortfolioPage = true;

  constructor(
    private firebaseApi: FirebaseApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const currentUrl = this.router.url;
    this.isPortfolioPage = currentUrl.includes("portfolio") ? true : false;
  }

  ngOnInit(): void {
    const orderQueryDesc = getOrderQueryDesc();
    this.firebaseApi
      .getFirebaseAllDocuments<ICV>(FCollectionName.CV, orderQueryDesc)
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
    const { pdf: url, title: fileName } = this.cv.find(
      ({ type }) => type === cvType
    );
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

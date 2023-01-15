import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import {
  FCollectionName,
  FirebaseOrderTypes,
  ICertificates,
  IFirebaseOrder,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";

@Component({
  selector: "pk-certificates",
  templateUrl: "./certificate-list.component.html",
  styleUrls: ["./certificate-list.component.scss"],
})
export class CertificateListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  title = "Certificates";
  certificates: ICertificates[];
  constructor(private firebaseApi: FirebaseApiService) {}

  ngOnInit(): void {
    const orderQuery: IFirebaseOrder = {
      order: "order",
      direction: FirebaseOrderTypes.desc,
    };
    this.firebaseApi
      .getFirebaseAllDocuments<ICertificates>(
        FCollectionName.CERTIFICATES,
        orderQuery
      )
      .pipe(
        takeUntil(this.destroy$),
        tap((certificates) => {
          this.certificates = certificates;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

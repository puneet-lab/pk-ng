import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import { FCollectionName, ICertificates } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { SharedService, getOrderQueryDesc } from "src/shared";

@Component({
  selector: "pk-certificates",
  templateUrl: "./certificate-list.component.html",
  styleUrls: ["./certificate-list.component.scss"],
})
export class CertificateListComponent {
  title = "Certificates";
  orderQuery = getOrderQueryDesc();
  certificates$ = this.sharedService.getContentList<ICertificates>(
    FCollectionName.CERTIFICATES,
    this.orderQuery
  );
  constructor(private sharedService: SharedService) {}
}

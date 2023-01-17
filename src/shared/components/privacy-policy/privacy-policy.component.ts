import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import { IPrivacyPolicy, FCollectionName } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { getOrderQueryAsc } from "src/shared/shared.helper";

@Component({
  selector: "pk-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent {
  privacyPolicy$ = this.firebaseApi.getFirebaseAllDocuments<IPrivacyPolicy>(
    FCollectionName.PRIVACY_POLICY,
    getOrderQueryAsc()
  );

  constructor(private firebaseApi: FirebaseApiService) {}
}

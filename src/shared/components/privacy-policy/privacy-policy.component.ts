import { Component, OnDestroy, OnInit } from "@angular/core";
import { FCollectionName, IPrivacyPolicy } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { SeoService } from "src/services/seo.service";
import { getOrderQueryAsc } from "src/shared/shared.helper";

@Component({
  selector: "pk-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  privacyPolicy$ = this.firebaseApi.getFirebaseAllDocuments<IPrivacyPolicy>(
    FCollectionName.PRIVACY_POLICY,
    getOrderQueryAsc()
  );

  constructor(
    private firebaseApi: FirebaseApiService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.addNoIndexMetaTags();
  }
  ngOnDestroy(): void {
    this.seoService.removeNoIndexMetaTags();
  }
}

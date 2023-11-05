import { Component } from "@angular/core";
import { FCollectionName, ICertificates } from "../../../../models";
import { SharedService, getOrderQueryDesc } from "../../../../shared";

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

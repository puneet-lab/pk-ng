import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import { FCollectionName, IContact } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { SharedService } from "src/shared";

@Component({
  selector: "pk-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: IContact[];
  destroy$ = new Subject<void>();

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.sharedService.contacts) {
      this.contacts = this.sharedService.contacts;
    } else {
      this.sharedService
        .getContactList()
        .pipe(
          takeUntil(this.destroy$),
          tap((contacts) => {
            this.contacts = contacts;
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { IContact } from "../../../models";
import { SharedService } from "../../../shared";

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
            console.log("contacts", contacts);
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

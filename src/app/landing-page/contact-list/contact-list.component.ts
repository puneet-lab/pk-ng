import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { tap } from "rxjs/internal/operators/tap";
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
      console.log("this.contacts", this.contacts);
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

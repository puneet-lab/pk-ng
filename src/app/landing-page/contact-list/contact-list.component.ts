import { Component, OnInit } from "@angular/core";
import { IContact } from "src/models";

@Component({
  selector: "pk-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
})
export class ContactListComponent implements OnInit {
  contacts: IContact[];
  ngOnInit(): void {
    this.contacts = [
      {
        id: "email",
        title: "rj.puneet.t800@gmail.com",
        icon: "fa-solid fa-envelope",
        href: "mailto:rj.puneet.t800@gmail.com",
        type: "Email",
        order: 1,
      },
      {
        id: "linkedin",
        title: "puneet-kushwah",
        icon: "fa-brands fa-linkedin",
        href: "https://www.linkedin.com/in/puneet-kushwah/",
        type: "LinkedIn",
        order: 2,
      },
    ];
  }
}

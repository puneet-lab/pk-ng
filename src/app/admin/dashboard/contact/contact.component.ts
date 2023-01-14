import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FCollectionName,
  IContact,
  ITitlebarActions,
  ITitlebarNotifyAction,
  ITitlebarToggle,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  getFormArraySharedButtons,
  notifyCommonTitleBarActions,
} from "src/shared";
// export const contactAll: IContact[] = [
//   {
//     id: "email",
//     type: "Email",
//     title: "rj.puneet.t800@gmail.com",
//     icon: "fa-solid fa-envelope",
//     href: "mailto:rj.puneet.t800@gmail.com",
//     order: 1,
//     isOpen: false,
//   },
//   {
//     id: "linkedin",
//     type: "LinkedIn",
//     title: "puneet-kushwah",
//     icon: "fa-brands fa-linkedin",
//     href: "https://www.linkedin.com/in/puneet-kushwah/",
//     order: 2,
//     isOpen: false,
//   },
//   {
//     id: "github",
//     type: "Github",
//     title: "puneet-lab",
//     icon: "fa-brands fa-square-github",
//     href: "https://github.com/puneet-lab",
//     order: 3,
//     isOpen: false,
//   },
//   {
//     id: "twitter",
//     type: "Twitter",
//     title: "Puneeet20",
//     icon: "fa-brands fa-square-twitter",
//     href: "https://twitter.com/Puneeet20",
//     order: 4,
//     isOpen: false,
//   },
//   {
//     id: "facebook",
//     type: "Facebook",
//     title: "R.Puneeet",
//     icon: "fa-brands fa-square-facebook",
//     href: "https://www.facebook.com/R.Puneeet",
//     order: 5,
//     isOpen: false,
//   },
//   {
//     id: "stackoverflow",
//     type: "Stackoverflow",
//     title: "puneet-kushwah",
//     icon: "fa-brands fa-stack-overflow",
//     href: "https://github.com/puneet-lab",
//     order: 6,
//     isOpen: false,
//   },
// ];
@Component({
  selector: "pk-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  get contactFormArray(): FormArray {
    return this.contactForm.get("contacts") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      contacts: this.fb.array([this.getContactFormGroup()]),
    });
  }

  getContactFormGroup(): FormGroup {
    return this.fb.group({
      id: ["", Validators.required],
      title: ["", Validators.required],
      icon: ["", Validators.required],
      href: ["", Validators.required],
      type: ["", Validators.required],
      order: [null, Validators.required],
      isOpen: [true, Validators.required],
    });
  }

  getFormArraySharedButtons(index: number): ITitlebarActions[] {
    return getFormArraySharedButtons(index, this.contactFormArray, {
      add: this.add.bind(this),
      remove: this.remove.bind(this),
    });
  }

  notifyToggle({ index, toggle }: ITitlebarToggle): void {
    this.contactFormArray.at(index).patchValue({ isOpen: toggle });
  }

  add(): void {
    this.contactFormArray.push(this.getContactFormGroup());
  }

  remove(index: number): void {
    this.contactFormArray.removeAt(index);
  }

  notifyAction(action: ITitlebarNotifyAction): void {
    notifyCommonTitleBarActions(action);
  }

  async saveContact(): Promise<void> {
    if (this.contactForm.invalid) {
      this.snackBar.open("Contact form is invalid");
    } else {
      try {
        const contacts = this.contactForm.value.contacts as IContact[];
        for (let index = 0; index < contacts.length; index++) {
          const contact = contacts[index];
          delete contact.isOpen;
          await this.firebaseApi.addFirebaseDocument(
            FCollectionName.CONTACTS,
            contact
          );
        }
        this.snackBar.open("Contact(s) saved!");
      } catch (error) {
        this.snackBar.open("Error in saving contact(s)");
        console.error("Error in saving contact(s) ", error);
      }
    }
  }
}

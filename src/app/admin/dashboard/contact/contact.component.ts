import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FCollectionName, IContact, OperationModes } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { SharedService, getOrderQueryAsc } from "src/shared";

@Component({
  selector: "pk-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  order = getOrderQueryAsc();
  contactForm: FormGroup;
  isShowForm = false;
  currOperationMode: OperationModes = null;
  contacts$ = this.sharedService.getContentList<IContact>(
    FCollectionName.CONTACTS,
    this.order
  );
  OperationModes = OperationModes;
  isButtonDisabled = false;
  @ViewChild("contactLengthEle") contactLengthEle: ElementRef;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.getContactFormGroup();
  }

  getContactFormGroup(): FormGroup {
    return this.fb.group({
      id: [""],
      title: ["", Validators.required],
      icon: ["", Validators.required],
      href: ["", Validators.required],
      type: ["", Validators.required],
      order: [null, Validators.required],
    });
  }

  onAddContact(): void {
    this.contactForm.reset();
    const contactLength = this.contactLengthEle.nativeElement?.value || 0;
    this.contactForm.get("order").setValue(+contactLength + 1);
    this.isShowForm = !this.isShowForm;
    this.currOperationMode = OperationModes.ADD;
  }

  onEditContact(contact: IContact): void {
    this.isShowForm = true;
    this.currOperationMode = OperationModes.EDIT;
    this.contactForm.patchValue({ ...contact });
  }

  async saveContact(): Promise<void> {
    if (this.contactForm.invalid) {
      this.snackBar.open("Contact form is invalid");
    } else {
      try {
        this.isButtonDisabled = true;
        const contact = this.contactForm.value as IContact;
        if (OperationModes.ADD === this.currOperationMode) {
          await this.firebaseApi.addFirebaseDocument(
            FCollectionName.CONTACTS,
            contact
          );
        } else {
          await this.firebaseApi.updateFirebaseDocumentByDocID(
            FCollectionName.CONTACTS,
            contact,
            contact.id
          );
        }
        this.snackBar.open("Contact saved!");
        this.contactForm.reset();
        this.isShowForm = false;
      } catch (error) {
        this.snackBar.open("Error in saving contact");
        console.error("Error in saving contact", error);
      } finally {
        this.isButtonDisabled = false;
      }
    }
  }

  async deleteContact({ id, type }: IContact): Promise<void> {
    try {
      if (window.confirm(`Are you sure to delete a contact: ${type}`)) {
        await this.firebaseApi.deleteFirebaseDocumentByDocID(
          FCollectionName.CONTACTS,
          id
        );
      }
    } catch (error) {
      this.snackBar.open("Error in deleting skill, try again later");
      throw error;
    }
  }
}

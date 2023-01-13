import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ITitlebarActions,
  ITitlebarNotifyAction,
  ITitlebarToggle,
} from "src/models";
import {
  getFormArraySharedButtons,
  notifyCommonTitleBarActions,
} from "src/shared";

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

  constructor(private fb: FormBuilder) {}

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
}

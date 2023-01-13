import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

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
    });
  }
}

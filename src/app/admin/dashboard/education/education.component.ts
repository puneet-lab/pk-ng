import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ITitlebarActions,
  ITitlebarToggle,
  ITitlebarNotifyAction,
  FCollectionName,
  IEducation,
  ICertificates,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  getFormArraySharedButtons,
  notifyCommonTitleBarActions,
} from "src/shared";

const x: ICertificates[] = [
  {
    title: "Microsoft Certified Associate -DB Admin Fundamentals",
    image:
      "https://firebasestorage.googleapis.com/v0/b/puneeetkushwah.appspot.com/o/certificates%2Fmsdb.png?alt=media&token=c18e490f-27e2-4819-a50a-2e311cdae68a",
    order: 1,
  },

  {
    title: "Microsoft Certified Associate - Web Dev Fundamentals",
    image:
      "https://firebasestorage.googleapis.com/v0/b/puneeetkushwah.appspot.com/o/certificates%2Fmsweb.png?alt=media&token=7c26228e-e9b9-4290-bd49-c2567639b5be",
    order: 2,
  },

  {
    title: "Microsoft Certified Professional (MCP)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/puneeetkushwah.appspot.com/o/certificates%2Fmsprofessional.png?alt=media&token=c9219c7b-a1e0-45e4-9752-d0cabadee91f",
    order: 3,
  },

  {
    title: "Oracle PL/SQL Developer Certified Associate (OCA)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/puneeetkushwah.appspot.com/o/certificates%2Foracleoca.png?alt=media&token=4c7699fb-8360-44bd-85e2-237ea9fb4a59",
    order: 4,
  },
];

@Component({
  selector: "pk-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
})
export class EducationComponent implements OnInit {
  educationForm: FormGroup;

  get educationFormArray(): FormArray {
    return this.educationForm.get("education") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService
  ) {}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      education: this.fb.array([this.getEducationFormGroup()]),
    });
  }

  getEducationFormGroup(): FormGroup {
    return this.fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      desc: ["", Validators.required],
      order: [null, Validators.required],
      isOpen: [true, Validators.required],
    });
  }

  getFormArraySharedButtons(index: number): ITitlebarActions[] {
    return getFormArraySharedButtons(index, this.educationFormArray, {
      add: this.add.bind(this),
      remove: this.remove.bind(this),
    });
  }

  notifyToggle({ index, toggle }: ITitlebarToggle): void {
    this.educationFormArray.at(index).patchValue({ isOpen: toggle });
  }

  add(): void {
    this.educationFormArray.push(this.getEducationFormGroup());
  }

  remove(index: number): void {
    this.educationFormArray.removeAt(index);
  }

  notifyAction(action: ITitlebarNotifyAction): void {
    notifyCommonTitleBarActions(action);
  }

  async saveEducation(): Promise<void> {
    // if (this.educationForm.invalid) {
    //   this.snackBar.open("Education form is invalid");
    // } else {
    try {
      const educations = x; //this.educationForm.value.educations as IEducation[];
      for (let index = 0; index < educations.length; index++) {
        const education = educations[index];
        await this.firebaseApi.addFirebaseDocument(
          FCollectionName.CERTIFICATES,
          education
        );
      }
      this.snackBar.open("Education(s) saved!");
    } catch (error) {
      this.snackBar.open("Error in saving Education(s)");
      console.error("Error in saving Education(s) ", error);
    }
  }
  // }
}

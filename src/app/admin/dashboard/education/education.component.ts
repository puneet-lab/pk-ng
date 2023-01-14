import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ITitlebarActions,
  ITitlebarToggle,
  ITitlebarNotifyAction,
  FCollectionName,
  IEducation,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  getFormArraySharedButtons,
  notifyCommonTitleBarActions,
} from "src/shared";

const x: IEducation[] = [
  {
    title: "Bachelor of Engineering | Computer Science / Indore, India",
    date: "2009-2013",
    desc: "Bachelor of Engineering from Sri Aurobindo Institute of Technology, Indore affiliated to RGPV, Bhopal with specialization in Computer Science (2009-2013) (Aggregate: 70%)",
    order: 3,
    isOpen: true,
  },
  {
    title:
      "Higher Secondary School Certificate (12th) | Mathematics / Dewas, India",
    date: "2008-2009",
    desc: "Higher Secondary School Certificate from B.C.M Junior College Dewas, M.P 2008-2009 (Percentage 83%)",
    order: 2,
    isOpen: true,
  },
  {
    title: "Secondary School Certificate (10th) | Dewas, India",
    date: "2006-2007",
    desc: "Secondary School Certificate from B.C.M Junior College Dewas, M.P 2006-2007 (Percentage 89%)",
    order: 1,
    isOpen: true,
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
        delete education.isOpen;
        await this.firebaseApi.addFirebaseDocument(
          FCollectionName.EDUCATION,
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

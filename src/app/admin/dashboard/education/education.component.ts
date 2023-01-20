import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, takeUntil, tap } from "rxjs";
import {
  FCollectionName,
  IEducation,
  ITitlebarActions,
  ITitlebarNotifyAction,
  ITitlebarToggle,
  OperationModes,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  SharedService,
  getFormArraySharedButtons,
  getOrderQueryAsc,
  notifyCommonTitleBarActions,
} from "src/shared";

@Component({
  selector: "pk-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
})
export class EducationComponent implements OnInit, OnDestroy {
  educationForm: FormGroup;
  order = getOrderQueryAsc();
  operationMode = OperationModes.ADD;
  education$ = this.sharedService.getContentList<IEducation>(
    FCollectionName.EDUCATION,
    this.order
  );
  destroy$ = new Subject<void>();
  get educationFormArray(): FormArray {
    return this.educationForm.get("education") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.education$
      .pipe(
        takeUntil(this.destroy$),
        tap((education) => {
          this.operationMode = education?.length
            ? OperationModes.EDIT
            : OperationModes.ADD;
          if (this.operationMode === OperationModes.ADD) {
            this.initAddEducation();
          } else {
            this.initEditEducation(education);
          }
        })
      )
      .subscribe();
  }

  initEditEducation(educations: IEducation[]): void {
    const educationFormArray = this.fb.array([]);
    this.educationForm = this.fb.group({
      education: educationFormArray,
    });

    educations.forEach((education, index) => {
      const educationFormGroup = this.getEducationFormGroup();
      educationFormGroup.patchValue({
        ...education,
        isOpen: index < educations?.length - 1 ? false : true,
      });
      this.educationFormArray.push(educationFormGroup);
    });
  }

  initAddEducation(): void {
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
    if (this.educationForm.invalid) {
      this.snackBar.open("Education form is invalid");
    } else {
      try {
        const educations = this.educationForm.value.educations as IEducation[];
        for (let index = 0; index < educations.length; index++) {
          const education = educations[index];
          await this.firebaseApi.addFirebaseDocument(
            FCollectionName.SKILLS,
            education
          );
        }
        this.snackBar.open("Education(s) saved!");
      } catch (error) {
        this.snackBar.open("Error in saving Education(s)");
        console.error("Error in saving Education(s) ", error);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

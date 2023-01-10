import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { OperationModes } from "src/models";
import { IExperience, IOrderText } from "src/models/admin.model";
import { ResponsibilityDialogComponent } from "./responsibility-dialog/responsibility-dialog.component";
import { tap } from "rxjs";

@Component({
  selector: "pk-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  responsibilitiesFormArray = this.fb.array([]);

  experienceFormGroup: FormGroup;

  operationMode = OperationModes.ADD;

  experienceList: IExperience[] = [];

  get experienceFormArray(): FormArray {
    return this.experienceFormGroup.get("experience") as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.operationMode === OperationModes.ADD) {
      this.initForAddExperience();
    } else {
      throw new Error("EDIT mode implement");
    }

    this.openResponsibility(0);
  }

  initForAddExperience(): void {
    const experienceFormArray = this.fb.array([this.getExperienceForm()]);
    this.experienceFormGroup = this.fb.group({
      experience: experienceFormArray,
    });
  }

  getExperienceForm(): FormGroup {
    return this.fb.group({
      position: ["", Validators.required],
      companyName: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      duration: ["", Validators.required],
      country: ["", Validators.required],
      order: [null, Validators.required],
      isOpen: [true],
      responsibilities: this.fb.array([]),
    });
  }

  addExperience(): void {
    this.experienceFormArray.push(this.getExperienceForm());
  }

  openCloseExp(index: number): void {
    const isOpen = !this.experienceFormArray.at(index).get("isOpen")?.value;
    this.experienceFormArray.at(index).patchValue({ isOpen });
  }

  removeExp(index: number): void {
    this.experienceFormArray.removeAt(index);
  }

  getResponsibilitiesFormGroup(): FormGroup {
    return this.fb.group({
      order: [null, Validators.required],
      text: ["", Validators.required],
    });
  }

  openResponsibility(formIndex: number): void {
    const resFormArray = this.experienceFormArray
      .at(formIndex)
      .get("responsibilities") as FormArray;

    const resFormValue = resFormArray?.value as IOrderText[];
    const resFormText = resFormValue.map(({ text }) => text);

    let dialogRef = this.dialog.open<
      ResponsibilityDialogComponent,
      string[],
      string[]
    >(ResponsibilityDialogComponent, {
      height: "600px",
      width: "1200px",
      data: resFormText,
    });

    this.patchResponsibilityData(dialogRef, resFormArray);
  }

  patchResponsibilityData(
    dialogRef: MatDialogRef<ResponsibilityDialogComponent, string[]>,
    resFormArray: FormArray
  ) {
    dialogRef
      .afterClosed()
      .pipe(
        tap((responsibilities: string[] | undefined) => {
          if (!responsibilities?.length) return;
          resFormArray.clear();
          responsibilities.map((res, i) => {
            const responsibilitiesFormGroup =
              this.getResponsibilitiesFormGroup();
            responsibilitiesFormGroup.patchValue({ order: i, text: res });
            resFormArray?.push(responsibilitiesFormGroup);
          });
        })
      )
      .subscribe();
  }
}

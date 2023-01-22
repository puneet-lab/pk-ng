import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap } from "rxjs";
import {
  FCollectionName,
  ITitlebarNotifyAction,
  OperationModes,
  TitlebarActionTypes,
} from "src/models";
import { IExperience, IOrderText } from "src/models/admin.model";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  SharedService,
  getOrderQueryAsc,
  notifyCommonTitleBarActions,
} from "src/shared";
import { ResponsibilityDialogComponent } from "./responsibility-dialog/responsibility-dialog.component";

@Component({
  selector: "pk-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  order = getOrderQueryAsc();
  experienceForm: FormGroup;
  isShowForm = false;
  currOperationMode: OperationModes = null;
  experiences$ = this.sharedService.getContentList<IExperience>(
    FCollectionName.EXPERIENCE,
    this.order
  );
  operationMode = OperationModes.ADD;
  isButtonDisabled = false;
  responsibilitiesFormArray = this.fb.array([]);
  @ViewChild("experienceLengthEle") experienceLengthEle: ElementRef;

  get resFormArray(): FormArray {
    return this.experienceForm.get("responsibilities") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private firebaseApi: FirebaseApiService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.experienceForm = this.getExperienceFormGroup();
  }

  getExperienceFormGroup(): FormGroup {
    return this.fb.group({
      position: ["", Validators.required],
      companyName: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      durationYear: [null, Validators.required],
      durationMonth: [null, Validators.required],
      country: ["", Validators.required],
      order: [null, Validators.required],
      responsibilities: this.fb.array([], Validators.required),
    });
  }

  editResponsibilities(
    experienceFormGroup: FormGroup,
    experience: IExperience
  ) {
    const resFormArray = experienceFormGroup.get(
      "responsibilities"
    ) as FormArray;
    experience.responsibilities.forEach(({ order, text }) => {
      const resFormGroup = this.patchResponsibilityFormGroup({ order, text });
      resFormArray.push(resFormGroup);
    });
  }

  notifyAction({ id, index, actionFunc }: ITitlebarNotifyAction): void {
    if (id === TitlebarActionTypes.EXP_RES) {
      this.openResponsibility(index);
    } else {
      notifyCommonTitleBarActions({ id, index, actionFunc });
    }
  }

  getResponsibilitiesFormGroup(): FormGroup {
    return this.fb.group({
      order: [null, Validators.required],
      text: ["", Validators.required],
    });
  }

  onEditExperience(experience: IExperience): void {
    this.isShowForm = true;
    this.currOperationMode = OperationModes.EDIT;
    this.experienceForm.patchValue({ ...experience });
    this.resFormArray.clear();
    experience.responsibilities.forEach((res) => {
      this.resFormArray.push(new FormControl(res));
    });
  }

  openResponsibility(formIndex: number): void {
    const resFormArray = this.resFormArray;
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

  onAddExperience(): void {
    this.experienceForm.reset();
    const experinceLength = this.experienceLengthEle.nativeElement?.value || 0;
    this.experienceForm.get("order").setValue(+experinceLength + 1);
    this.isShowForm = !this.isShowForm;
    this.currOperationMode = OperationModes.ADD;
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
          responsibilities.map((text, order) => {
            const responsibilitiesFormGroup = this.patchResponsibilityFormGroup(
              { order, text }
            );
            resFormArray?.push(responsibilitiesFormGroup);
          });
        })
      )
      .subscribe();
  }

  patchResponsibilityFormGroup({ order, text }: IOrderText): FormGroup {
    const responsibilitiesFormGroup = this.getResponsibilitiesFormGroup();
    responsibilitiesFormGroup.patchValue({ order, text });
    return responsibilitiesFormGroup;
  }

  async saveExperience(): Promise<void> {
    if (this.experienceForm.invalid) {
      this.snackBar.open("Experience form is invalid");
    } else {
      try {
        const experiences = this.experienceForm.value
          .experience as IExperience[];
        for (let index = 0; index < experiences.length; index++) {
          const experience = experiences[index];
          await this.firebaseApi.addFirebaseDocument(
            FCollectionName.EXPERIENCE,
            experience
          );
        }
        this.snackBar.open("Experience saved!");
      } catch (error) {
        this.snackBar.open("Error in saving experience");
        console.error("Error in saving experience ", error);
      }
    }
  }

  async deleteExperience({ id, companyName }: IExperience): Promise<void> {
    try {
      if (
        window.confirm(`Are you sure to delete a experience: ${companyName}`)
      ) {
        await this.firebaseApi.deleteFirebaseDocumentByDocID(
          FCollectionName.EXPERIENCE,
          id
        );
      }
    } catch (error) {
      this.snackBar.open("Error in deleting skill, try again later");
      throw error;
    }
  }
}

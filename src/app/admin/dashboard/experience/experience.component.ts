import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  FCollectionName,
  ITitlebarActions,
  ITitlebarNotifyAction,
  ITitlebarToggle,
  OperationModes,
  TitlebarActionTypes,
} from "src/models";
import { IExperience, IOrderText } from "src/models/admin.model";
import { ResponsibilityDialogComponent } from "./responsibility-dialog/responsibility-dialog.component";
import { tap } from "rxjs";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private firebaseApi: FirebaseApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.operationMode === OperationModes.ADD) {
      this.initForAddExperience();
    } else {
      throw new Error("EDIT mode implement");
    }
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
      durationYear: [null, Validators.required],
      durationMonth: [null, Validators.required],
      country: ["", Validators.required],
      order: [null, Validators.required],
      isOpen: [true],
      responsibilities: this.fb.array([], Validators.required),
    });
  }

  notifyAction({ id, index }: ITitlebarNotifyAction): void {
    switch (id) {
      case TitlebarActionTypes.ADD:
        this.addExperience();
        break;
      case TitlebarActionTypes.DELETE:
        this.removeExp(index);
        break;
      case TitlebarActionTypes.EXP_RES:
        this.openResponsibility(index);
        break;
      default:
        throw new Error("Not a valid Title bar action");
    }
  }

  addExperience(): void {
    this.experienceFormArray.push(this.getExperienceForm());
  }

  openCloseExp({ index, toggle }: ITitlebarToggle): void {
    // const isOpen = !this.experienceFormArray.at(index).get("isOpen")?.value;
    this.experienceFormArray.at(index).patchValue({ isOpen: toggle });
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

  async saveExperience(): Promise<void> {
    if (this.experienceFormGroup.invalid) {
      this.snackBar.open("Experience form is invalid");
    } else {
      try {
        const experiences = this.experienceFormGroup.value
          .experience as IExperience[];
        for (let index = 0; index < experiences.length; index++) {
          const experience = experiences[index];
          const res = await this.firebaseApi.addFirebaseDocument(
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

  getExperienceActions(index: number): ITitlebarActions[] {
    return [
      {
        id: TitlebarActionTypes.EXP_RES,
        icon: "fa-solid fa-list",
        isShow: true,
      },
      {
        id: TitlebarActionTypes.ADD,
        icon: "fa-solid fa-plus",
        isShow: index === this.experienceFormArray.controls?.length - 1,
      },
      {
        id: TitlebarActionTypes.DELETE,
        icon: "fa-solid fa-trash-can",
        isShow: index > 0,
      },
    ];
  }
}

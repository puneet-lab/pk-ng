import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, takeUntil, tap } from "rxjs";
import {
  FCollectionName,
  ITitlebarActions,
  ITitlebarNotifyAction,
  ITitlebarToggle,
  OperationModes,
  TitlebarActionTypes,
} from "src/models";
import { IExperience, IOrderText } from "src/models/admin.model";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  SharedService,
  getFormArraySharedButtons,
  getOrderQueryAsc,
  notifyCommonTitleBarActions,
} from "src/shared";
import { ResponsibilityDialogComponent } from "./responsibility-dialog/responsibility-dialog.component";

@Component({
  selector: "pk-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  order = getOrderQueryAsc();
  experiences$ = this.sharedService.getContentList<IExperience>(
    FCollectionName.EXPERIENCE,
    this.order
  );
  experienceForm: FormGroup;
  operationMode = OperationModes.ADD;
  experienceList: IExperience[] = [];
  responsibilitiesFormArray = this.fb.array([]);
  destroy$ = new Subject<void>();

  get experienceFormArray(): FormArray {
    return this.experienceForm.get("experience") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private firebaseApi: FirebaseApiService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.experiences$
      .pipe(
        takeUntil(this.destroy$),
        tap((experiences) => {
          this.operationMode = experiences?.length
            ? OperationModes.EDIT
            : OperationModes.ADD;
          if (this.operationMode === OperationModes.ADD) {
            this.initAddExperience();
          } else {
            this.initEditExperience(experiences);
          }
        })
      )
      .subscribe();
  }

  initAddExperience(): void {
    const experienceFormArray = this.fb.array([this.getExperienceFormGroup()]);
    this.experienceForm = this.fb.group({
      experience: experienceFormArray,
    });
  }

  initEditExperience(experiences: IExperience[]): void {
    const experienceFormArray = this.fb.array([]);
    this.experienceForm = this.fb.group({
      experience: experienceFormArray,
    });
    experiences.forEach((experience, index) => {
      const experienceFormGroup = this.getExperienceFormGroup();
      experienceFormGroup.patchValue({
        ...experience,
        isOpen: index < experiences?.length - 1 ? false : true,
      });
      this.editResponsibilities(experienceFormGroup, experience);
      this.experienceFormArray.push(experienceFormGroup);
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
      isOpen: [true],
      responsibilities: this.fb.array([], Validators.required),
    });
  }

  notifyAction({ id, index, actionFunc }: ITitlebarNotifyAction): void {
    if (id === TitlebarActionTypes.EXP_RES) {
      this.openResponsibility(index);
    } else {
      notifyCommonTitleBarActions({ id, index, actionFunc });
    }
  }

  addExperience(): void {
    this.experienceFormArray.push(this.getExperienceFormGroup());
  }

  openCloseExp({ index, toggle }: ITitlebarToggle): void {
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

  getExperienceActions(index: number): ITitlebarActions[] {
    return [
      {
        id: TitlebarActionTypes.EXP_RES,
        icon: "fa-solid fa-list",
        isShow: true,
      },
      ...getFormArraySharedButtons(index, this.experienceFormArray, {
        add: this.addExperience.bind(this),
        remove: this.removeExp.bind(this),
      }),
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

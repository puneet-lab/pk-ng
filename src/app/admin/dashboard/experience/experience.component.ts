import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FCollectionName, OperationModes } from "../../../../models";
import { IExperience, IOrderText } from "../../../../models/admin.model";
import { FirebaseApiService } from "../../../../services/firebase-api.service";
import { SharedService, getOrderQueryAsc } from "../../../../shared";

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

  removeResponsibility(index: number): void {
    this.resFormArray.removeAt(index);
  }

  addResponsibility(): void {
    this.resFormArray.push(this.getResponsibilitiesFormGroup());
  }

  getExperienceFormGroup(): FormGroup {
    return this.fb.group({
      id: [""],
      position: ["", Validators.required],
      companyName: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      durationYear: [null, Validators.required],
      durationMonth: [null, Validators.required],
      country: ["", Validators.required],
      order: [null, Validators.required],
      responsibilities: this.fb.array(
        [this.getResponsibilitiesFormGroup()],
        Validators.required
      ),
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
    experience.responsibilities.forEach(({ order, text }) => {
      const resFormGroup = this.patchResponsibilityFormGroup({ order, text });
      this.resFormArray.push(resFormGroup);
    });
  }

  onAddExperience(): void {
    this.experienceForm.reset();
    const experinceLength = this.experienceLengthEle.nativeElement?.value || 0;
    this.experienceForm.get("order").setValue(+experinceLength + 1);
    this.isShowForm = !this.isShowForm;
    this.currOperationMode = OperationModes.ADD;
  }

  patchResponsibilityFormGroup({ order, text }: IOrderText): FormGroup {
    const responsibilitiesFormGroup = this.getResponsibilitiesFormGroup();
    responsibilitiesFormGroup.patchValue({ order, text });
    return responsibilitiesFormGroup;
  }

  async saveExperience(): Promise<void> {
    this.patchResOrder();
    if (this.experienceForm.invalid) {
      this.snackBar.open("Experience form is invalid");
    } else {
      try {
        this.isButtonDisabled = true;
        const experience = this.experienceForm.value as IExperience;
        if (OperationModes.ADD === this.currOperationMode) {
          await this.firebaseApi.addFirebaseDocument(
            FCollectionName.EXPERIENCE,
            experience
          );
        } else {
          await this.firebaseApi.updateFirebaseDocumentByDocID(
            FCollectionName.EXPERIENCE,
            experience,
            experience.id
          );
        }
        this.snackBar.open("SelfProjects saved!, Upload image if needed");
        this.experienceForm.reset();
        this.isShowForm = false;
        this.snackBar.open("Experience saved!");
      } catch (error) {
        this.snackBar.open("Error in saving experience");
        console.error("Error in saving experience ", error);
      } finally {
        this.isButtonDisabled = false;
      }
    }
  }

  drop(
    event: CdkDragDrop<IOrderText[]>,
    { responsibilities, id }: IExperience
  ) {
    const { previousIndex, currentIndex } = event;
    moveItemInArray(responsibilities, previousIndex, currentIndex);
    this.updateOrderResponsibility(id, responsibilities);
  }

  async updateOrderResponsibility(
    id: string,
    responsibilityList: IOrderText[]
  ): Promise<void> {
    try {
      const responsibilities = responsibilityList.map((res, index) => ({
        ...res,
        order: index + 1,
      }));
      await this.firebaseApi.updateFirebaseDocumentByDocID(
        FCollectionName.EXPERIENCE,
        { responsibilities },
        id
      );
    } catch (error) {
      this.snackBar.open("Error in updating order of responsibilities");
      throw error;
    }
  }

  patchResOrder(): void {
    this.resFormArray.controls.forEach((ctrl, index) => {
      ctrl.get("order").setValue(index);
    });
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

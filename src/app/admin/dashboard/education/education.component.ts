import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FCollectionName, IEducation, OperationModes } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { SharedService, getOrderQueryAsc } from "src/shared";

@Component({
  selector: "pk-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
})
export class EducationComponent implements OnInit {
  order = getOrderQueryAsc();
  educationForm: FormGroup;
  isShowForm = false;
  currOperationMode: OperationModes = null;
  education$ = this.sharedService.getContentList<IEducation>(
    FCollectionName.EDUCATION,
    this.order
  );
  operationMode = OperationModes.ADD;
  isButtonDisabled = false;
  @ViewChild("educationLengthEle") educationLengthEle: ElementRef;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.educationForm = this.getEducationFormGroup();
  }

  getEducationFormGroup(): FormGroup {
    return this.fb.group({
      id: [""],
      title: ["", Validators.required],
      date: ["", Validators.required],
      desc: ["", Validators.required],
      order: [null, Validators.required],
    });
  }

  onAddEducation(): void {
    this.educationForm.reset();
    const contactLength = this.educationLengthEle.nativeElement?.value || 0;
    this.educationForm.get("order").setValue(+contactLength + 1);
    this.isShowForm = !this.isShowForm;
    this.currOperationMode = OperationModes.ADD;
  }

  onEditEducation(education: IEducation): void {
    this.isShowForm = true;
    this.currOperationMode = OperationModes.EDIT;
    this.educationForm.patchValue({ ...education });
  }

  async saveEducation(): Promise<void> {
    if (this.educationForm.invalid) {
      this.snackBar.open("Education form is invalid");
    } else {
      try {
        this.isButtonDisabled = true;
        const education = this.educationForm.value as IEducation;
        if (OperationModes.ADD === this.currOperationMode) {
          await this.firebaseApi.addFirebaseDocument(
            FCollectionName.EDUCATION,
            education
          );
        } else {
          await this.firebaseApi.updateFirebaseDocumentByDocID(
            FCollectionName.EDUCATION,
            education,
            education.id
          );
        }
        this.snackBar.open("Education saved!");
        this.educationForm.reset();
        this.isShowForm = false;
      } catch (error) {
        this.snackBar.open("Error in saving education");
        console.error("Error in saving education", error);
      } finally {
        this.isButtonDisabled = false;
      }
    }
  }

  async deleteEducation({ id, title }: IEducation): Promise<void> {
    try {
      if (window.confirm(`Are you sure to delete a education: ${title}`)) {
        await this.firebaseApi.deleteFirebaseDocumentByDocID(
          FCollectionName.EDUCATION,
          id
        );
      }
    } catch (error) {
      this.snackBar.open("Error in deleting skill, try again later");
      throw error;
    }
  }
}

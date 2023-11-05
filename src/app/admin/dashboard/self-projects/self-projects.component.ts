import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FCollectionName,
  ISelfProjects,
  OperationModes,
} from "../../../../models";
import { FirebaseApiService } from "../../../../services/firebase-api.service";
import { SharedService, getOrderQueryAsc } from "../../../../shared";

@Component({
  selector: "pk-self-projects",
  templateUrl: "./self-projects.component.html",
  styleUrls: ["./self-projects.component.scss"],
})
export class SelfProjectsComponent implements OnInit {
  order = getOrderQueryAsc();
  selfProjectsForm: FormGroup;
  isShowForm = false;
  currOperationMode: OperationModes = null;
  selfProjects$ = this.sharedService.getContentList<ISelfProjects>(
    FCollectionName.SELF_PROJECTS,
    this.order
  );
  operationMode = OperationModes.ADD;
  isButtonDisabled = false;

  get stackFormArray(): FormArray {
    return this.selfProjectsForm.get("stack") as FormArray;
  }
  @ViewChild("selfProjectLengthEle") selfProjectLengthEle: ElementRef;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.selfProjectsForm = this.getSelfProjectsFormGroup();
  }

  getSelfProjectsFormGroup(): FormGroup {
    return this.fb.group({
      id: [""],
      title: ["", Validators.required],
      desc: ["", Validators.required],
      url: ["", Validators.required],
      image: [""],
      order: [null, Validators.required],
      stack: this.fb.array([new FormControl("")], Validators.required),
    });
  }

  addStack(): void {
    this.stackFormArray.push(new FormControl());
  }

  removeStack(index: number): void {
    this.stackFormArray.removeAt(index);
  }

  onAddSelfProjects(): void {
    this.selfProjectsForm.reset();
    const selfProjectsLength =
      this.selfProjectLengthEle.nativeElement?.value || 0;
    this.selfProjectsForm.get("order").setValue(+selfProjectsLength + 1);
    this.isShowForm = !this.isShowForm;
    this.currOperationMode = OperationModes.ADD;
  }

  onEditSelfProject(selfProject: ISelfProjects): void {
    this.isShowForm = true;
    this.currOperationMode = OperationModes.EDIT;
    this.selfProjectsForm.patchValue({ ...selfProject });
    this.stackFormArray.clear();
    selfProject.stack.forEach((stack) => {
      this.stackFormArray.push(new FormControl(stack));
    });
  }

  async saveSelfProjects(): Promise<void> {
    if (this.selfProjectsForm.invalid) {
      this.snackBar.open("SelfProjects form is invalid");
    } else {
      try {
        this.isButtonDisabled = true;
        const selfProject = this.selfProjectsForm.value as ISelfProjects;
        if (OperationModes.ADD === this.currOperationMode) {
          await this.firebaseApi.addFirebaseDocument(
            FCollectionName.SELF_PROJECTS,
            selfProject
          );
        } else {
          await this.firebaseApi.updateFirebaseDocumentByDocID(
            FCollectionName.SELF_PROJECTS,
            selfProject,
            selfProject.id
          );
        }
        this.snackBar.open("SelfProjects saved!, Upload image if needed");
        this.selfProjectsForm.reset();
        this.isShowForm = false;
      } catch (error) {
        this.snackBar.open("Error in saving selfProject");
        console.error("Error in saving selfProject", error);
      } finally {
        this.isButtonDisabled = false;
      }
    }
  }

  async deleteSelfProject({ id, title }: ISelfProjects): Promise<void> {
    try {
      if (window.confirm(`Are you sure to delete a selfProject: ${title}`)) {
        await this.firebaseApi.deleteFirebaseDocumentByDocID(
          FCollectionName.SELF_PROJECTS,
          id
        );
      }
    } catch (error) {
      this.snackBar.open("Error in deleting skill, try again later");
      throw error;
    }
  }

  async uploadImageAndUpdate(event: any, { id }: ISelfProjects): Promise<void> {
    try {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const fileName = file.name;
        const storageName = "/self-project";
        const { downloadLink, status } =
          await this.firebaseApi.uploadFileToFirebaseStorage(
            fileName,
            storageName,
            file
          );

        if (status) {
          await this.updateImageUrl(downloadLink, id);
        } else {
          this.snackBar.open("Error in uploading image");
        }
      }
    } catch (error) {
      this.snackBar.open("Error in uploading image");
      throw error;
    }
  }

  async updateImageUrl(downloadLink: string, id: string): Promise<void> {
    await this.firebaseApi.updateFirebaseDocumentByDocID(
      FCollectionName.SELF_PROJECTS,
      { image: downloadLink },
      id
    );
  }
}

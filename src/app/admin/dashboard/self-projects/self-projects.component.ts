import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, takeUntil, tap } from "rxjs";
import {
  FCollectionName,
  ISelfProjects,
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
  selector: "pk-self-projects",
  templateUrl: "./self-projects.component.html",
  styleUrls: ["./self-projects.component.scss"],
})
export class SelfProjectsComponent implements OnInit, OnDestroy {
  order = getOrderQueryAsc();
  selfProjects$ = this.sharedService.getContentList<ISelfProjects>(
    FCollectionName.SELF_PROJECTS,
    this.order
  );
  selfProjectsForm: FormGroup;
  operationMode = OperationModes.ADD;
  OperationModes = OperationModes;
  destroy$ = new Subject<void>();

  get selfProjectsFormArray(): FormArray {
    return this.selfProjectsForm.get("selfProjects") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.selfProjects$
      .pipe(
        takeUntil(this.destroy$),
        tap((selfProjects) => {
          this.operationMode = selfProjects?.length
            ? OperationModes.EDIT
            : OperationModes.ADD;
          if (this.operationMode === OperationModes.ADD) {
            this.initAddSelfProjects();
          } else {
            this.initEditSelfProjects(selfProjects);
          }
        })
      )
      .subscribe();
  }

  initAddSelfProjects(): void {
    const selfProjectsFormArray = this.fb.array([
      this.getSelfProjectsFormGroup(),
    ]);
    this.selfProjectsForm = this.fb.group({
      selfProjects: selfProjectsFormArray,
    });
  }

  initEditSelfProjects(selfProjects: ISelfProjects[]): void {
    const selfProjectsFormArray = this.fb.array([]);
    this.selfProjectsForm = this.fb.group({
      selfProjects: selfProjectsFormArray,
    });
    selfProjects.forEach((selfProject, index) => {
      const selfProjectsFormGroup = this.getSelfProjectsFormGroup();
      selfProjectsFormGroup.patchValue({
        ...selfProject,
        isOpen: index < selfProjects?.length - 1 ? false : true,
      });
      // this.editResponsibilities(selfProjectsFormGroup, selfProjects);
      this.selfProjectsFormArray.push(selfProjectsFormGroup);
    });
  }

  getSelfProjectsFormGroup(): FormGroup {
    return this.fb.group({
      title: ["", Validators.required],
      desc: ["", Validators.required],
      url: ["", Validators.required],
      image: ["", Validators.required],
      order: [null, Validators.required],
      stack: this.fb.array([], Validators.required),
      isOpen: [true, Validators.required],
    });
  }

  getFormArraySharedButtons(index: number): ITitlebarActions[] {
    return getFormArraySharedButtons(index, this.selfProjectsFormArray, {
      add: this.add.bind(this),
      remove: this.remove.bind(this),
    });
  }

  add(): void {
    this.selfProjectsFormArray.push(this.getSelfProjectsFormGroup());
  }

  remove(index: number): void {
    this.selfProjectsFormArray.removeAt(index);
  }

  notifyToggle({ index, toggle }: ITitlebarToggle): void {
    this.selfProjectsFormArray.at(index).patchValue({ isOpen: toggle });
  }

  notifyAction(action: ITitlebarNotifyAction): void {
    notifyCommonTitleBarActions(action);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

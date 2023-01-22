import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  Subject,
  catchError,
  combineLatest,
  merge,
  takeUntil,
  tap,
} from "rxjs";
import {
  FCollectionName,
  ISkillTypes,
  ISkills,
  OperationModes,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  SharedService,
  createSkillTypesMap,
  getOrderQueryAsc,
} from "src/shared";

@Component({
  selector: "pk-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit, OnDestroy {
  order = getOrderQueryAsc();
  skillTypeForm = this.fb.group({
    type: ["", Validators.required],
    title: ["", Validators.required],
  });
  skillsForm = this.fb.group({
    group: ["", Validators.required],
    skill: ["", Validators.required],
    logo: ["", Validators.required],
  });
  skillType$ = this.sharedService.getContentList<ISkillTypes>(
    FCollectionName.SKILL_TYPES,
    this.order
  );

  skills$ = this.sharedService.getContentList<ISkills>(
    FCollectionName.SKILLS,
    this.order
  );
  operationMode = OperationModes.ADD;
  OperationModes = OperationModes;
  skillTypes: ISkillTypes[];
  isShowAddSkillTypes = false;
  isShowAddSkill = false;
  skills: ISkills[];
  skillTypesMap: { [key: string]: ISkills[] };
  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    combineLatest([this.skillType$, this.skills$])
      .pipe(
        takeUntil(this.destroy$),
        tap(([skillTypes, skills]) => {
          this.skillTypes = skillTypes;
          this.skills = skills;
          this.operationMode = skills?.length
            ? OperationModes.EDIT
            : OperationModes.ADD;
          if (this.operationMode === OperationModes.ADD) {
            this.initAddSkills();
          } else {
            this.initEditSkills();
          }
        })
      )
      .subscribe();
  }

  initEditSkills(): void {
    this.skillTypesMap = createSkillTypesMap(this.skillTypes, this.skills);
  }

  initAddSkills() {
    // throw new Error("Method not implemented.");
  }

  dropSkillTypes(event: CdkDragDrop<string[]>) {
    const { previousIndex, currentIndex } = event;
    moveItemInArray(this.skillTypes, previousIndex, currentIndex);
    this.updateOrderSkillTypes();
  }

  dropSkill(event: CdkDragDrop<string[]>, skillType: string) {
    const { previousIndex, currentIndex } = event;
    moveItemInArray(this.skillTypesMap[skillType], previousIndex, currentIndex);
    this.updateOrderSkill(skillType);
  }

  updateOrderSkillTypes(): void {
    this.skillTypes = this.skillTypes.map((skillType, index) => ({
      ...skillType,
      order: index + 1,
    }));
    const updateSkillsOrder$ = this.skillTypes.map(({ id, order }, index) =>
      this.firebaseApi.updateFirebaseDocumentByDocID<{ order: number }>(
        FCollectionName.SKILL_TYPES,
        { order },
        id
      )
    );
    this.updateOrder(updateSkillsOrder$);
  }

  updateOrderSkill(skillType: string): void {
    this.skillTypesMap[skillType] = this.skillTypesMap[skillType].map(
      (skills, index) => ({
        ...skills,
        order: index + 1,
      })
    );

    const updateSkills$ = this.skillTypesMap[skillType].map(
      ({ id, order }, index) =>
        this.firebaseApi.updateFirebaseDocumentByDocID<{ order: number }>(
          FCollectionName.SKILLS,
          { order },
          id
        )
    );
    this.updateOrder(updateSkills$);
  }

  updateOrder(order$: Promise<boolean>[]): void {
    merge(...order$)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.snackBar.open("Error in updating order of skill types");
          throw e;
        })
      )
      .subscribe();
  }

  showSkillTypesForm(): void {
    this.isShowAddSkillTypes = !this.isShowAddSkillTypes;
  }

  showSkillForm(): void {
    this.isShowAddSkill = !this.isShowAddSkill;
  }

  async saveNewSkillType(): Promise<void> {
    try {
      const skillType = this.skillTypeForm.value;
      const order = this.skillTypes.length + 1;
      await this.firebaseApi.addFirebaseDocument(FCollectionName.SKILL_TYPES, {
        ...skillType,
        order,
      });
      this.skillTypeForm.reset();
      this.isShowAddSkillTypes = false;
    } catch (error) {
      this.snackBar.open("Error in saving new skill type, try again later");
      throw error;
    }
  }

  async saveNewSkill(): Promise<void> {
    try {
      const skill = this.skillsForm.value;
      const order = this.skillTypesMap[skill.group].length + 1;
      await this.firebaseApi.addFirebaseDocument(FCollectionName.SKILLS, {
        ...skill,
        order,
      });
      this.skillsForm.reset();
      this.isShowAddSkill = false;
    } catch (error) {
      this.snackBar.open("Error in saving new skill, try again later");
      throw error;
    }
  }

  async deleteSkill({ id, skill }: ISkills): Promise<void> {
    try {
      if (window.confirm(`Are you sure to delete skill - ${skill}`)) {
        await this.firebaseApi.deleteFirebaseDocumentByDocID(
          FCollectionName.SKILLS,
          id
        );
      }
    } catch (error) {
      this.snackBar.open("Error in deleting skill, try again later");
      throw error;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

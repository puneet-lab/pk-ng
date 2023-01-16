import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, combineLatest, takeUntil, tap } from "rxjs";
import {
  FCollectionName,
  FirebaseOrderTypes,
  IFirebaseOrder,
  ISkillTypes,
  ISkills,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";

@Component({
  selector: "pk-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  title = "About";
  skillTypesMap = {} as { [key: string]: ISkills[] };
  skillTypes: ISkillTypes[];
  skills: ISkills[];

  orderQueryAsc: IFirebaseOrder = {
    order: "order",
    direction: FirebaseOrderTypes.asc,
  };

  skillTypes$ = this.firebaseApi.getFirebaseAllDocuments<ISkillTypes>(
    FCollectionName.SKILL_TYPES,
    this.orderQueryAsc
  );
  skills$ = this.firebaseApi.getFirebaseAllDocuments<ISkills>(
    FCollectionName.SKILLS,
    this.orderQueryAsc
  );

  responsibilities = [
    "verifying good UI/UX design,",
    "leading/co-developing the back-end and front-end,",
    "setting up the CI/CD,",
    "mentoring the team,",
    "estimating tasks,",
    "researching possible techs,",
    "leading, launching and monitoring the project.",
  ];

  constructor(private firebaseApi: FirebaseApiService) {}

  ngOnInit(): void {
    combineLatest([this.skillTypes$, this.skills$])
      .pipe(
        takeUntil(this.destroy$),
        tap(([skillTypes, skills]) => {
          this.skillTypes = skillTypes;
          this.skills = skills;
          this.createSkillTypesMap();
        })
      )
      .subscribe();
  }

  createSkillTypesMap(): void {
    for (let index = 0; index < this.skillTypes.length; index++) {
      const { type } = this.skillTypes[index];
      this.skillTypesMap[type] = this.skills.filter(
        ({ group }) => group === type
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

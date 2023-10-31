import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, concatMap, takeUntil, tap } from "rxjs";
import { FCollectionName, ISkillTypes, ISkills } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import { createSkillTypesMap, getOrderQueryAsc } from "src/shared";

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

  orderQueryAsc = getOrderQueryAsc();

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
    this.skillTypes$
      .pipe(
        takeUntil(this.destroy$),
        concatMap((skillTypes) => {
          this.skillTypes = skillTypes;
          return this.skills$;
        }),
        tap((skills) => {
          this.skills = skills;
          this.skillTypesMap = createSkillTypesMap(
            this.skillTypes,
            this.skills
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

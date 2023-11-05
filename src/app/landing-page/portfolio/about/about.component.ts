import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { concatMap, takeUntil, tap } from "rxjs/operators";
import { FCollectionName, ISkillTypes, ISkills } from "../../../../models";
import { FirebaseApiService } from "../../../../services/firebase-api.service";
import { createSkillTypesMap, getOrderQueryAsc } from "../../../../shared";

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
  expYears = this.getTotalYearsSince2014();

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
    "Ensuring a seamless and visually appealing UI/UX design,",
    "Spearheading and co-engineering robust solutions for both back-end and front-end,",
    "Establishing and optimizing CI/CD pipelines for efficient development workflows,",
    "Leading and mentoring the team through effective coaching and guidance,",
    "Precisely estimating and allocating tasks aligned with project timelines,",
    "Conducting comprehensive research to explore and integrate suitable technologies,",
    "Facilitating Agile methodologies for iterative and responsive project development,",
    "Playing a pivotal role in launching and vigilantly monitoring the project's performance,",
    "Leading cross-functional teams and ensuring timely delivery with Agile practices,",
    "Implementing strategic planning and prioritization for team tasks and sprints.",
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

  getTotalYearsSince2014(): number {
    const startYear = 2014;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

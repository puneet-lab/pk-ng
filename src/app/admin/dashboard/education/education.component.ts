import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ITitlebarActions,
  ITitlebarToggle,
  ITitlebarNotifyAction,
  FCollectionName,
  IEducation,
  ICertificates,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";
import {
  getFormArraySharedButtons,
  notifyCommonTitleBarActions,
} from "src/shared";
const x = [
  {
    skill: "Angular",
    logo: "https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg",
    group: "js",
    order: 1,
  },
  {
    skill: "Vue",
    logo: "https://cdn.worldvectorlogo.com/logos/vue-9.svg",
    group: "js",
    order: 2,
  },
  {
    skill: "Vuex",
    logo: "https://cdn.worldvectorlogo.com/logos/vue-9.svg",
    group: "js",
    order: 3,
  },
  {
    skill: "RxJS",
    logo: "https://cdn.worldvectorlogo.com/logos/rxjs-1.svg",
    group: "js",
    order: 4,
  },
  {
    skill: "Node JS",
    logo: "https://cdn.worldvectorlogo.com/logos/alpine-13.svg",
    group: "js",
    order: 5,
  },
  {
    skill: "TypeScript",
    logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
    group: "js",
    order: 6,
  },

  {
    skill: "Javascript",
    logo: "https://cdn.worldvectorlogo.com/logos/logo-javascript.svg",
    group: "js",
    order: 7,
  },
  {
    skill: "jQuery",
    logo: "https://cdn.worldvectorlogo.com/logos/jquery-4.svg",
    group: "js",
    order: 8,
  },
  {
    skill: "Alpine JS",
    logo: "https://cdn.worldvectorlogo.com/logos/alpine-13.svg",
    group: "js",
    order: 9,
  },
  {
    skill: "Ionic",
    logo: "https://pics.freeicons.io/uploads/icons/png/6219238431580802964-512.png",
    group: "js",
    order: 10,
  },

  {
    skill: "HTML",
    logo: "https://cdn.worldvectorlogo.com/logos/html-1.svg",
    group: "fe",
    order: 1,
  },
  {
    skill: "CSS",
    logo: "https://cdn.worldvectorlogo.com/logos/css-3.svg",
    group: "fe",
    order: 2,
  },
  {
    skill: "SCSS",
    logo: "https://cdn.worldvectorlogo.com/logos/sass-1.svg",
    group: "fe",
    order: 3,
  },
  {
    skill: "Tailwind",
    logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
    group: "fe",
    order: 4,
  },
  {
    skill: "Bootstrap",
    logo: "https://cdn.worldvectorlogo.com/logos/bootstrap-5-1.svg",
    group: "5",
    order: 5,
  },

  {
    skill: "Laravel",
    logo: "https://cdn.worldvectorlogo.com/logos/laravel-2.svg",
    group: "be",
    order: 1,
  },
  {
    skill: "C#",
    logo: "https://cdn.worldvectorlogo.com/logos/c--4.svg",
    group: "be",
    order: 2,
  },
  {
    skill: "PHP",
    logo: "https://cdn.worldvectorlogo.com/logos/php-logo-only-letter.svg",
    group: "be",
    order: 3,
  },
  {
    skill: "PL/SQL",
    logo: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg",
    group: "be",
    order: 4,
  },

  {
    skill: "Oracle DB",
    logo: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg",
    group: "db",
    order: 1,
  },
  {
    skill: "PostgresSQL",
    logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
    group: "db",
    order: 2,
  },
  {
    skill: "MySQL",
    logo: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg",
    group: "db",
    order: 3,
  },
  {
    skill: "MongoDB",
    logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
    group: "db",
    order: 4,
  },
  {
    skill: "Redis",
    logo: "https://cdn.worldvectorlogo.com/logos/redis.svg",
    group: "db",
    order: 5,
  },
  {
    skill: "Firebase",
    logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
    group: "db",
    order: 6,
  },
  {
    skill: "GraphQL",
    logo: "https://cdn.worldvectorlogo.com/logos/graphql-logo-2.svg",
    group: "other",
    order: 1,
  },
  {
    skill: "Apollo",
    logo: "https://cdn.worldvectorlogo.com/logos/apollo-graphql-compact.svg",
    group: "other",
    order: 2,
  },
  {
    skill: "Git",
    logo: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
    group: "other",
    order: 3,
  },
  {
    skill: "docker",
    logo: "https://cdn.worldvectorlogo.com/logos/docker.svg",
    group: "other",
    order: 4,
  },
  {
    skill: "Kubernets",
    logo: "https://cdn.worldvectorlogo.com/logos/kubernets.svg",
    group: "other",
    order: 5,
  },
];

@Component({
  selector: "pk-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
})
export class EducationComponent implements OnInit {
  educationForm: FormGroup;

  get educationFormArray(): FormArray {
    return this.educationForm.get("education") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private firebaseApi: FirebaseApiService
  ) {}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      education: this.fb.array([this.getEducationFormGroup()]),
    });
  }

  getEducationFormGroup(): FormGroup {
    return this.fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      desc: ["", Validators.required],
      order: [null, Validators.required],
      isOpen: [true, Validators.required],
    });
  }

  getFormArraySharedButtons(index: number): ITitlebarActions[] {
    return getFormArraySharedButtons(index, this.educationFormArray, {
      add: this.add.bind(this),
      remove: this.remove.bind(this),
    });
  }

  notifyToggle({ index, toggle }: ITitlebarToggle): void {
    this.educationFormArray.at(index).patchValue({ isOpen: toggle });
  }

  add(): void {
    this.educationFormArray.push(this.getEducationFormGroup());
  }

  remove(index: number): void {
    this.educationFormArray.removeAt(index);
  }

  notifyAction(action: ITitlebarNotifyAction): void {
    notifyCommonTitleBarActions(action);
  }

  async saveEducation(): Promise<void> {
    // if (this.educationForm.invalid) {
    //   this.snackBar.open("Education form is invalid");
    // } else {
    try {
      const educations = x; //this.educationForm.value.educations as IEducation[];
      for (let index = 0; index < educations.length; index++) {
        const education = educations[index];
        console.log("👉 ~ saveEducation ~ education", education?.skill);
        await this.firebaseApi.addFirebaseDocument(
          FCollectionName.SKILLS,
          education
        );
      }
      this.snackBar.open("Education(s) saved!");
    } catch (error) {
      this.snackBar.open("Error in saving Education(s)");
      console.error("Error in saving Education(s) ", error);
    }
  }
  // }
}

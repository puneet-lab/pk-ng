import { AngularFireStorageReference } from "@angular/fire/compat/storage";
import { UploadTaskSnapshot } from "@angular/fire/compat/storage/interfaces";
import { WhereFilterOp } from "@firebase/firestore-types";
import { Observable } from "rxjs";

export enum FCollectionName {
  USERS = "users",
  EXPERIENCE = "experience",
  CONTACTS = "contacts",
  EDUCATION = "education",
}

export enum FirebaseOrderTypes {
  "asc" = "asc",
  "desc" = "desc",
}
export interface IFirebaseStore {
  colName: FCollectionName;
  docName: string;
}

export interface IFirebaseWhere {
  key: string;
  value: any;
  ops: WhereFilterOp;
}

export interface IFirebaseUploadResponse {
  uploadTask: Observable<UploadTaskSnapshot | undefined>;
  fileRef: AngularFireStorageReference;
}

export interface IFirebaseDate {
  seconds: number;
  nanoseconds: number;
}

export interface IFirebaseOrder {
  order: string;
  direction: FirebaseOrderTypes;
}

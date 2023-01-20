import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs";
import {
  IContact,
  FCollectionName,
  IExperience,
  IFirebaseOrder,
} from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  contacts: IContact[];
  constructor(private firebaseApi: FirebaseApiService) {}

  getContentList<T>(
    collection: FCollectionName,
    order: IFirebaseOrder
  ): Observable<T[]> {
    return this.firebaseApi.getFirebaseAllDocuments<T>(collection, order);
  }

  getContactList(): Observable<IContact[]> {
    return this.firebaseApi
      .getFirebaseAllDocuments<IContact>(FCollectionName.CONTACTS)
      .pipe(
        tap((contacts) => {
          this.contacts = contacts.sort(
            (prevContact, nextContact) => prevContact.order - nextContact.order
          );
        })
      );
  }
}

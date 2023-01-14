import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs";
import { IContact, FCollectionName } from "src/models";
import { FirebaseApiService } from "src/services/firebase-api.service";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  contacts: IContact[];
  constructor(private firebaseApi: FirebaseApiService) {}

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

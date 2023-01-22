import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentReference,
} from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  FCollectionName,
  IDownloadResponse,
  IFirebaseOrder,
  IFirebaseStore,
  IFirebaseWhere,
} from "../models";
@Injectable({
  providedIn: "root",
})
export class FirebaseApiService {
  constructor(
    private afFirestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  getFirebaseAllDocuments<T>(
    collection: FCollectionName,
    orderParams: IFirebaseOrder | null = null
  ): Observable<T[]> {
    if (orderParams) {
      const { order, direction } = orderParams;
      return this.afFirestore
        .collection<T>(collection, (ref) => ref.orderBy(order, direction))
        .valueChanges({ idField: "id" })
        .pipe(map((data) => data));
    } else {
      return this.afFirestore
        .collection<T>(collection)
        .valueChanges({ idField: "id" })
        .pipe(map((data) => data));
    }
  }

  getFirebaseDocumentByName<T>({
    colName,
    docName,
  }: IFirebaseStore): Observable<T | undefined> {
    return this.afFirestore
      .collection<T>(colName)
      .doc(docName)
      .valueChanges()
      .pipe(map((data) => data));
  }

  async addFirebaseDocument<T>(
    collectionName: string,
    collectionData: T
  ): Promise<DocumentReference<T>> {
    try {
      const collection = await this.afFirestore
        .collection<T>(`${collectionName}`)
        .add(collectionData);
      return collection;
    } catch (error) {
      console.error("Error at Firebase add collection API :>> ", error);
      throw error;
    }
  }

  async addFirebaseDocumentByDocID<T>(
    collectionName: string,
    collectionData: T,
    docID: string
  ): Promise<boolean> {
    try {
      await this.afFirestore
        .collection<T>(`${collectionName}`)
        .doc(docID)
        .set(collectionData);
      return true;
    } catch (error) {
      console.error(
        "Error at Firebase add collection by docID API :>> ",
        error
      );
      return false;
    }
  }

  async updateFirebaseDocumentByDocID<T>(
    collectionName: string,
    collectionData: T,
    docID: string
  ): Promise<boolean> {
    try {
      await this.afFirestore
        .collection<T>(`${collectionName}`)
        .doc(docID)
        .update(collectionData);
      return true;
    } catch (error) {
      console.error(
        "Error at Firebase update collection by docID API :>> ",
        error
      );
      return false;
    }
  }

  async deleteFirebaseDocumentByDocID<T>(
    collectionName: string,
    docID: string
  ): Promise<boolean> {
    try {
      await this.afFirestore
        .collection<T>(`${collectionName}`)
        .doc(docID)
        .delete();
      return true;
    } catch (error) {
      console.error(
        "Error at Firebase delete collection by docID API :>> ",
        error
      );
      return false;
    }
  }

  getFirebaseCollectionQuery<T>(
    collection: FCollectionName,
    where: IFirebaseWhere[]
  ): Observable<T[]> {
    switch (where?.length) {
      case 1: {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { key, value, ops } = where[0];
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const fireRef = this.afFirestore.collection<T>(collection, (ref) =>
          ref.where(key, ops, value)
        );
        return fireRef.valueChanges();
      }
      case 2:
        const { key, value, ops } = where[0];
        const { key: key1, value: value1, ops: ops1 } = where[0];
        const fireRef = this.afFirestore.collection<T>(collection, (ref) =>
          ref.where(key, ops, value).where(key1, ops1, value1)
        );

        return fireRef.valueChanges().pipe(map((data) => data));
      default:
        throw new Error("NOT_A_VALID_GET_FIREBASE_CASE");
    }
  }

  async uploadFileToFirebaseStorage(
    fileName: string,
    storageName: string,
    fileBlob: Blob
  ): Promise<IDownloadResponse> {
    try {
      const storage = getStorage();
      const storagePath = `${storageName}/${fileName}`;
      const imagesRef = ref(storage, storagePath);
      const uploadTask = await uploadBytes(imagesRef, fileBlob);
      const downloadLink = await getDownloadURL(uploadTask.ref);
      return {
        downloadLink,
        status: true,
      };
    } catch (error) {
      console.log("Error in uploading file uploadFileToFirebaseStorage", error);
      return {
        downloadLink: null,
        status: false,
      };
    }
  }

  async downloadFileFromURL(
    url: string,
    fileName: string,
    fileType: string
  ): Promise<boolean> {
    try {
      const storage = getStorage();
      const httpsReference = ref(storage, url);
      const blobRef = await getBlob(httpsReference);
      const blob = new Blob([blobRef], { type: fileType });
      const urlRef = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.download = fileName;
      anchor.href = urlRef;
      anchor.click();
      return true;
    } catch (error) {
      console.error("Error in download file by url", error);
      return false;
    }
  }
}

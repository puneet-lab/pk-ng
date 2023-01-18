import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth = getAuth();
  user: any;
  private _isSignedIn = false;
  private isSignedIn = new BehaviorSubject(this._isSignedIn);
  isSignedIn$ = this.isSignedIn.asObservable();

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isSignedIn.next(true);
      } else {
        this.user = null;
        this.isSignedIn.next(false);
      }
    });
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (error) {
      console.error("AUTHERROR::", error);
      return false;
    }
  }

  async logout() {
    await signOut(this.auth);
    console.log("Youve been signed out!");
  }
}

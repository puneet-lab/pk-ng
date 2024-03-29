import { NgModule } from "@angular/core";
import { provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { initializeApp } from "firebase/app";
import { environment } from "src/environments/environment";
import {
  PageNotFoundComponent,
  PrivacyPolicyComponent,
} from "src/shared/components";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
const firebaseSetting = environment.firebase;
const app = initializeApp(firebaseSetting);
@NgModule({
  declarations: [AppComponent, PrivacyPolicyComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseSetting),
    provideFirebaseApp(() => app),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

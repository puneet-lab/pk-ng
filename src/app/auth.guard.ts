import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { PageUrlTypes } from "src/models";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private afAuthService: AngularFireAuth, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuthService.user.pipe(
      tap((user) => {
        if (!user) {
          this.router.navigate([PageUrlTypes.ADMIN]);
        }
      }),
      map((user) => !!user)
    );
  }
}

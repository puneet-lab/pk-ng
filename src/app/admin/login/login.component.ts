import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { PageUrlTypes } from "src/models";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "pk-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  }) as FormGroup;
  isLoading = false;
  loadingText = "Loading...";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.isSignedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate([PageUrlTypes.ADMIN_EXPERIENCE]);
      }
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.openSnackBar("Please add login details");
      return;
    }
    this.loadingText = "Logging you in";
    this.isLoading = true;
    const loginFormValue = this.loginForm.value;
    const { email, password } = loginFormValue;

    const isLogin = await this.authService.loginWithEmailAndPassword(
      email,
      password
    );
    this.onLoginResult(isLogin);
  }

  onLoginResult(isLogin: boolean) {
    if (isLogin) {
      this.router.navigate([PageUrlTypes.ADMIN_DASHBOARD]);
    } else {
      this.openSnackBar("Error in Loggin in, check your email id and password");
    }
    this.isLoading = false;
  }

  openSnackBar(text: string) {
    this.snackBarService.open(text);
  }
}

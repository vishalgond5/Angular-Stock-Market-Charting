import { stringify } from "@angular/compiler/src/util";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { LoginRequestPayload } from "./login-request.payload";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isError: boolean;
  isAdmin: boolean;
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  signupSuccessMessage: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginRequestPayload = {
      userName: "",
      password: "",
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.confirmed !== undefined && params.confirmed === "true") {
        this.toastr.success("Signup successful");
        this.signupSuccessMessage =
          "Please check your inbox for activation link, " +
          "activate your account before you login";
      }
    });

    this.authService.isAdmin.subscribe(
      (data: boolean) => (this.isAdmin = data)
    );
  }

  login() {
    this.loginRequestPayload.userName = this.loginForm.get("userName").value;
    this.loginRequestPayload.password = this.loginForm.get("password").value;

    this.authService.login(this.loginRequestPayload).subscribe((data) => {
      // if login successful...
      if (data) {
        this.isError = false;

        // Redirect to USER or ADMIN sections
        if (this.isAdmin) {
          this.router.navigateByUrl("/admin");
        } else {
          this.router.navigateByUrl("/user");
        }
        //  this.router.navigateByUrl('/'); // goes to the root url
        this.toastr.success("Login successful");
      }
      // else
      else {
        this.isError = true;
        console.log(data);
      }
    });
  }
}

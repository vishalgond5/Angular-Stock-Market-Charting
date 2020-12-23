import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { SignupRequestPayload } from "./signup-request.payload";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signupRequestPayload = {
      eMail: "",
      userName: "",
      password: "",
      mobileNo: "",
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      eMail: new FormControl("", [Validators.required, Validators.email]),
      userName: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      mobileNo: new FormControl("", Validators.required),
    });
  }

  signup() {
    this.signupRequestPayload.eMail = this.signupForm.get("eMail").value;
    this.signupRequestPayload.userName = this.signupForm.get("userName").value;
    this.signupRequestPayload.password = this.signupForm.get("password").value;
    this.signupRequestPayload.mobileNo = this.signupForm.get("mobileNo").value;

    this.authService.signup(this.signupRequestPayload).subscribe(
      // If signup is successful...
      () => {
        this.router.navigate(["/login"], {
          queryParams: { confirmed: "true" },
        });
      },

      // If not successful
      () => {
        this.toastr.error("Registration failed! Please try again");
      }
    );
  }
}

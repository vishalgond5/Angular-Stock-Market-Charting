import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { LoginComponent } from "../auth/login/login.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.authService.userName.subscribe(
      (data: string) => (this.userName = data)
    );
    this.authService.isAdmin.subscribe(
      (data: boolean) => (this.isAdmin = data)
    );
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl("");
  }
}

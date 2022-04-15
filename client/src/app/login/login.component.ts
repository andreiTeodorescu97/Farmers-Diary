import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "app/_services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginModel: any = {};

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginModel).subscribe(
      (respone) => {
        console.log(respone);
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

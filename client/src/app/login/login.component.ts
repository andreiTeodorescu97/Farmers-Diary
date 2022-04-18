import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "app/_services/account.service";
import * as mdb from "mdb-ui-kit";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginModel: any = {};
  @ViewChild("myPassword") myPass: any;
  type: string = "password";

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginModel).subscribe(
      (respone) => {
        console.log(respone);
        this.router.navigateByUrl("/dashboard");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onShowPassword() {
    if (this.type === "password") {
      this.type = "text";
    } else {
      this.type = "password";
    }
    this.myPass.nativeElement.type = this.type;
  }
}

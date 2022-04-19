import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "app/_services/account.service";
import { NotificationsService } from "app/_services/notifications.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginModel: any = {};
  @ViewChild("myPassword") myPass: any;
  type: string = "password";

  constructor(private accountService: AccountService, private router: Router, private notificationService: NotificationsService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginModel).subscribe(
      (respone) => {
        this.router.navigateByUrl("/dashboard");
        this.notificationService.showSuccess("Bine te-ai logat!");
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

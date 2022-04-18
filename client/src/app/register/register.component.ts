import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterUser } from "app/_models/user/registerUser";
import { AccountService } from "app/_services/account.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerModel = {} as RegisterUser;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.registerModel).subscribe(
      (respone) => {
        this.toastr.success("Contul a fost creat cu success!");
        this.router.navigateByUrl("/login");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

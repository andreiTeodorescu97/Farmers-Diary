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
  @ViewChild("myPassword") myPass: any;
  typePass: string = "password";
  @ViewChild("myPasswordRepeat") myPassRep: any;
  typePassRep: string = "password";

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

  onShowPassword() {
    if (this.typePass === "password") {
      this.typePass = "text";
    } else {
      this.typePass = "password";
    }
    this.myPass.nativeElement.type = this.typePass;
  }

  onShowPasswordRepeat() {
    if (this.typePassRep === "password") {
      this.typePassRep = "text";
    } else {
      this.typePassRep = "password";
    }
    this.myPassRep.nativeElement.type = this.typePassRep;
  }
}

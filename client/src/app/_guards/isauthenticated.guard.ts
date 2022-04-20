import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AccountService } from "app/_services/account.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IsAuthenticated implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}

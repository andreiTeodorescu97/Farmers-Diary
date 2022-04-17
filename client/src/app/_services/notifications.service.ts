import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  constructor(private toastr: ToastrService) {}

  showSuccess(string) {
    this.toastr.success(
      '<div class="alert alert-info" data-notify="container"><button type="button" aria-hidden="true" class="close">×</button> <span data-notify="icon" class="pe-7s-bell"></span><span data-notify="message">This is a notification with close button and icon.</span></div>'
    );
  }

  showError(string) {}
}

import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message) {
    this.toastr.success(
      `${message}`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        positionClass: "toast-top-right" 
      }
    );
  }

  showError(message) {
    this.toastr.error(
      `${message}`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        positionClass: "toast-top-right" 
      }
    );
  }
}

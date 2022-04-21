import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AddParcel } from "app/_models/farm/addparcel";
import { County } from "app/_models/farm/county";
import { Culture } from "app/_models/farm/culture";
import { CollectionsService } from "app/_services/collections.service";
import { FarmService } from "app/_services/farm.service";
import { NotificationsService } from "app/_services/notifications.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { map } from "rxjs/operators";

@Component({
  selector: "app-farm",
  templateUrl: "./farm.component.html",
  styleUrls: ["./farm.component.css"],
})
export class FarmComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private collectionService: CollectionsService,
    private farmService: FarmService,
    private notificationService: NotificationsService
  ) {}
  registerParcel = {} as AddParcel;
  @ViewChild("postForm") pForm: NgForm;
  loadedCultures: Culture[] = [];
  loadedCounties: County[] = [];

  ngOnInit(): void {
    this.onGetCultures();
    this.onGetCounties();
  }

  addParcelModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeParcelModal() {
    this.modalRef.hide();
  }

  onGetCultures() {
    this.collectionService
      .getCultures()
      .pipe(
        map((responseData) => {
          const culturesArray: Culture[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              culturesArray.push({ ...responseData[key] });
            }
          }
          return culturesArray;
        })
      )
      .subscribe((culturesData) => {
        this.loadedCultures = culturesData;
      });
  }

  onGetCounties() {
    this.collectionService
      .getCounties()
      .pipe(
        map((responseData) => {
          const countiesArray: County[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              countiesArray.push({ ...responseData[key] });
            }
          }
          return countiesArray;
        })
      )
      .subscribe((countiesData) => {
        this.loadedCounties = countiesData;
      });
  }

  onAddParcel() {
    this.registerParcel.countyId = +this.registerParcel.countyId;
    this.registerParcel.cultureId = +this.registerParcel.cultureId;
    this.farmService.addParcel(this.registerParcel).subscribe(
      (respone) => {
        this.notificationService.showSuccess("Contul a fost creat cu success!");
      },
      (error) => {
        console.log(error);
      }
    );
    this.modalRef.hide();
  }
}

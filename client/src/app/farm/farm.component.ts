import {
  Component,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AddParcel } from "app/_models/farm/addparcel";
import { County } from "app/_models/farm/county";
import { Culture } from "app/_models/farm/culture";
import { EditParcel } from "app/_models/farm/editparcel";
import { Parcel } from "app/_models/farm/parcel";
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
  registerParcel = {} as AddParcel;
  @ViewChild("postForm") pForm: NgForm;
  loadedCultures: Array<Culture> = [];
  loadedCounties: Array<County> = [];
  parcels: Array<Parcel> = [];

  constructor(
    private modalService: BsModalService,
    private collectionService: CollectionsService,
    private farmService: FarmService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.onGetCultures();
    this.onGetCounties();
    this.onGetParcels();
  }

  addParcelModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeParcelModal() {
    this.modalRef.hide();
  }

  onGetCultures() {
    this.collectionService.getCultures().subscribe((response) => {
      this.loadedCultures = response;
    });
  }

  onGetCounties() {
    this.collectionService.getCounties().subscribe((response) => {
      this.loadedCounties = response;
    });
  }

  onAddParcel() {
    this.registerParcel.countyId = +this.registerParcel.countyId;
    this.registerParcel.cultureId = +this.registerParcel.cultureId;
    this.farmService.addParcel(this.registerParcel).subscribe(
      () => {
        this.notificationService.showSuccess(
          "Parcela a fost adaugata cu succes!"
        );
        this.onGetParcels();
      },
      (error) => {
        console.log(error);
      }
    );
    this.modalRef.hide();
  }

  onDeleteParcel(parcelToDelte: Parcel) {
    if (
      confirm(`Esti sigur ca vrei sa stergi parcela ${parcelToDelte.name}?`)
    ) {
      this.farmService.deleteParcel(parcelToDelte.id).subscribe(
        () => {
          this.notificationService.showSuccess(
            "Parcela a fost stearsa cu succes!"
          );
          this.onGetParcels();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onViewParcel() {
    alert("TO BE IMPLEMENTED!");
  }

  onGetParcels() {
    this.farmService.getParcels().subscribe((data) => {
      this.parcels = data;
    });
  }
}

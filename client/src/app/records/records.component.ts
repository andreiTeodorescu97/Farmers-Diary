import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { IAddFertilizerRegistry } from "app/_models/farm/addfertilizerregistrydata";
import { IFertilizerRegistry } from "app/_models/farm/fertilizerregistrydata";
import { Parcel } from "app/_models/farm/parcel";
import { FarmService } from "app/_services/farm.service";
import { FertilizersService } from "app/_services/fertilizers.service";
import { NotificationsService } from "app/_services/notifications.service";
import { error } from "console";
import { data } from "jquery";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.css"],
})
export class RecordsComponent implements OnInit {
  modalRef?: BsModalRef;
  registerFertilizer = {} as IAddFertilizerRegistry;
  loadedFertilizers: Array<IFertilizerRegistry> = [];
  parcels: Array<Parcel> = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: BsModalService,
    private fertilizerService: FertilizersService,
    private notificationService: NotificationsService,
    private farmService: FarmService
  ) {}

  ngOnInit(): void {
    this.onGetParcels();
    this.onGetFertilizers();
  }

  onGetParcels() {
    this.farmService.getParcels().subscribe((data) => {
      this.parcels = data;
    });
  }

  addFertilizerModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeFertilizerModal() {
    this.modalRef.hide();
  }

  onAddFertilizer() {
    this.fertilizerService
      .addFertilizersRegistry(this.registerFertilizer)
      .subscribe(
        () => {
          this.notificationService.showSuccess(
            "Actiunea de fertilizare a fost adaugata cu succes!"
          );
          this.onGetFertilizers();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onGetFertilizers() {
    this.fertilizerService.getFertilizersRegistry().subscribe((data) => {
      data.forEach(element => {
        element.formatedDate = new Date(element.dateApplied).toLocaleDateString('en-GB')
      });
      this.loadedFertilizers = data
    })
  }

  addTreatmentModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeTreatmentModal() {
    this.modalRef.hide();
  }
}

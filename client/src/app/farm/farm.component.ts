import { Component, OnInit, TemplateRef } from "@angular/core";
import { Culture } from "app/_models/farm/culture";
import { CollectionsService } from "app/_services/collections.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-farm",
  templateUrl: "./farm.component.html",
  styleUrls: ["./farm.component.css"],
})
export class FarmComponent implements OnInit {
  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private collectionService: CollectionsService
  ) {}
  cultures: Culture;

  ngOnInit(): void {}

  addParcelModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onGetCultures() {
    this.collectionService
      .getCultures()
      .subscribe((data: Culture) => console.log(data));
  }
}

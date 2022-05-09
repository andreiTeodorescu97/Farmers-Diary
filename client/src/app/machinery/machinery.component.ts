import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-machinery",
  templateUrl: "./machinery.component.html",
  styleUrls: ["./machinery.component.css"],
})
export class MachineryComponent implements OnInit {
  modalRef?: BsModalRef;
  machinery = {};
  availableMachinery = [
    "Tractor",
    "Masina utilitara",
    "Combinator",
    "Incarcator frontal",
    "Cap tractor",
    "Remorca",
    "Rotor",
    "Compactor",
    "Masina de erbicidat",
  ];

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  addMachineryModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

import { Component, OnInit, TemplateRef } from "@angular/core";
import { FinancingProgram } from "app/_models/farm/financingprogram";
import { Parcel } from "app/_models/farm/parcel";
import { FarmService } from "app/_services/farm.service";
import { FinancingProgramsService } from "app/_services/financingprograms.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-financing-criteria",
  templateUrl: "./financing-criteria.component.html",
  styleUrls: ["./financing-criteria.component.css"],
})
export class FinancingCriteriaComponent implements OnInit {
  modalRef: BsModalRef;
  programs: FinancingProgram[] = [];


  constructor(
    private financingProgramsService: FinancingProgramsService
  ) {}

  ngOnInit(): void {
    this.programs = this.financingProgramsService.availableFinancingPrograms;
  }
}

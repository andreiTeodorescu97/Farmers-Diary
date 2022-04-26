import { Component, OnInit } from "@angular/core";
import { FinancingProgram } from "app/_models/farm/financingprogram";
import { FinancingProgramsService } from "app/_services/financingprograms.service";
import { Criteria } from "app/_models/farm/criteria";

@Component({
  selector: "app-available-financing",
  templateUrl: "./available-financing.component.html",
  styleUrls: ["./available-financing.component.css"],
})
export class AvailableFinancingComponent implements OnInit {
  availablePrograms: FinancingProgram[] = [];

  constructor(private financingProgramsService: FinancingProgramsService) {}

  ngOnInit(): void {
    this.availablePrograms =
      this.financingProgramsService.availableFinancingPrograms;
  }
}

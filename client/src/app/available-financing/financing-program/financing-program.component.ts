import { Component, Input, OnInit } from "@angular/core";
import { FinancingProgram } from "app/_models/farm/financingprogram";

@Component({
  selector: "app-financing-program",
  templateUrl: "./financing-program.component.html",
  styleUrls: ["./financing-program.component.css"],
})
export class FinancingProgramComponent implements OnInit {
  @Input() program: FinancingProgram;

  constructor() {}

  ngOnInit(): void {}
}

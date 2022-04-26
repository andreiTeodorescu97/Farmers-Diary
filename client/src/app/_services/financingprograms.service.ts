import { Injectable } from "@angular/core";
import { FinancingProgram } from "app/_models/farm/financingprogram";
import { Criteria } from "app/_models/farm/criteria";

@Injectable({
  providedIn: "root",
})
export class FinancingProgramsService {
  availableFinancingPrograms: FinancingProgram[] = [
    new FinancingProgram(1, "Submasura 4.1", [
      new Criteria(1, "Hectare", 10),
      new Criteria(2, "Animale", "Vaci"),
    ]),
    new FinancingProgram(2, "Submasura 5.2", [
      new Criteria(1, "Hectare", 5),
      new Criteria(2, "Plantatie", "Porumb"),
      new Criteria(3, "Ingrasaminte", "XMC-25"),
    ]),
  ];
}

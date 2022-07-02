import { Component, OnInit } from "@angular/core";
import { FinancingProgram } from "app/_models/farm/financingprogram";
import { FinancingProgramsService } from "app/_services/financingprograms.service";
import { Criteria } from "app/_models/farm/criteria";
import { Parcel } from "app/_models/farm/parcel";
import { FarmService } from "app/_services/farm.service";

@Component({
  selector: "app-available-financing",
  templateUrl: "./available-financing.component.html",
  styleUrls: ["./available-financing.component.css"],
})
export class AvailableFinancingComponent implements OnInit {
  availablePrograms: FinancingProgram[] = [];
  criteriaCategories = [
    "Dimensiune",
    "Cultura",
    "Animale",
    "Ingrasaminte",
    "Zona",
  ];
  parcels: Array<Parcel> = [];
  totalArea: number = 0;
  currentCultures: string[] = [];
  counties: string[] = [];
  fertilizers: string[] = [];
  eligiblePrograms: FinancingProgram[] = [];

  constructor(
    private financingProgramsService: FinancingProgramsService,
    private farmService: FarmService
  ) {}

  ngOnInit(): void {
    this.availablePrograms =
      this.financingProgramsService.availableFinancingPrograms;
    this.getParcelsData();
  }

  getParcelsData() {
    this.farmService.getParcels().subscribe((data) => {
      this.parcels = data;
      this.getData();
    });
  }

  getData() {
    this.getTotalArea();
    this.getCurrentCultures();
    this.getCountiesWithFarm();
    this.checkProgramIfEligible();
  }

  getTotalArea() {
    this.totalArea = this.parcels
      .map((p) => p.surface)
      .reduce((acc, curr) => acc + curr, 0);
  }

  getCurrentCultures() {
    let distinct = [];
    this.currentCultures = this.parcels.map((p) => p.cultureName);
    for (let elem of this.currentCultures) {
      if (!distinct.includes(elem)) {
        distinct.push(elem);
      }
    }
    this.currentCultures = distinct
  }

  getCountiesWithFarm() {
    let distinct = [];
    this.counties = this.parcels.map((p) => p.countyName);
    for (let elem of this.counties) {
      if (!distinct.includes(elem)) {
        distinct.push(elem);
      }
    }
    this.counties = distinct
  }

  checkProgramIfEligible() {
    for (let program of this.availablePrograms) {
      let currFarmPoints = 0;
      let dimensionCriteria = program.criteria.find(
        (c) => c.category === "Dimensiune"
      );
      let cultureCriteria = program.criteria.filter(
        (c) => c.category === "Cultura"
      );
      // let fertilizerCriteria = program.criteria.find((c) => c.category === "Ingrasaminte")
      let zoneCriteria = program.criteria.find((c) => c.category === "Zona");
      if (dimensionCriteria) {
        if (
          +this.totalArea <= dimensionCriteria.maxAmount &&
          +this.totalArea >= dimensionCriteria.minAmount
        ) {
          currFarmPoints += dimensionCriteria.points;
        }
      }
      // if (cultureCriteria) {
      //   for (let criteria of cultureCriteria){
      //     // if (this.currentCultures.includes(criteria.type)){
      //     //   this.
      //     // }
      //     for (let culture of this.currentCultures){
      //       if(criteria.type.includes(culture)){
      //         currFarmPoints += cultureCriteria.points
      //       }
      //     }
      //   }
      // }
      // if(fertilizerCriteria) {
      //   console.log(fertilizerCriteria);
      // }
      // if (zoneCriteria) {
      //   console.log(zoneCriteria);
      // }
      if (currFarmPoints >0){
        this.eligiblePrograms.push(program)
      }
    }
  }
}

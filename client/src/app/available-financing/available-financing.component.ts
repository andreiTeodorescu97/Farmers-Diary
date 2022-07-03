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
  criteriaCategories = [
    "Dimensiune",
    "Cultura",
    "Animale",
    "Ingrasaminte",
    "Zona",
  ];
  parcels: Array<Parcel> = [];
  // Elements for criterias
  totalArea: number = 0;
  currentCulturesOfFarm: string[] = [];
  currentCountiesOfFarm: string[] = [];
  fertilizers: string[] = [];
  // Total number of programs
  availablePrograms: FinancingProgram[] = [];
  // The eligible programs for the farm
  eligiblePrograms: FinancingProgram[] = [];
  currFarmPoints: number = 0

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
    this.currentCulturesOfFarm = this.parcels.map((p) => p.cultureName);
    for (let elem of this.currentCulturesOfFarm) {
      if (!distinct.includes(elem)) {
        distinct.push(elem);
      }
    }
    this.currentCulturesOfFarm = distinct
  }

  getCountiesWithFarm() {
    let distinct = [];
    this.currentCountiesOfFarm = this.parcels.map((p) => p.countyName);
    for (let elem of this.currentCountiesOfFarm) {
      if (!distinct.includes(elem)) {
        distinct.push(elem);
      }
    }
    this.currentCountiesOfFarm = distinct
  }

  checkProgramIfEligible() {
    for (let program of this.availablePrograms) {
      let currProgramPoints = 0
      let dimensionCriteria = program.criteria.filter(
        (c) => c.category === "Dimensiune"
      );
      let cultureCriteria = program.criteria.filter(
        (c) => c.category === "Cultura"
      );
      // let fertilizerCriteria = program.criteria.find((c) => c.category === "Ingrasaminte")
      let zoneCriteria = program.criteria.filter((c) => c.category === "Zona");
      // Criterias for total farm area
      if (dimensionCriteria.length !== 0) {
        dimensionCriteria.forEach( dimCrit => {
          if (
            +this.totalArea <= dimCrit.maxAmount &&
            +this.totalArea >= dimCrit.minAmount
          ) {
            currProgramPoints += dimCrit.points;
          }
        })}

        // Criteria for cultures
      if (cultureCriteria.length !== 0) {
        for (let criteria of cultureCriteria){
            const eligibleFarmCultures = this.currentCulturesOfFarm.filter(currCult => criteria.type.includes(currCult));
            if (eligibleFarmCultures.length !== 0){
              currProgramPoints += criteria.points
            }
          }
        }
      
      // if(fertilizerCriteria) {
      //   console.log(fertilizerCriteria);
      // }
      if (zoneCriteria) {
        for (let criteria of zoneCriteria){
          const eligibleFarmZones = this.currentCountiesOfFarm.filter(currCounty => criteria.type.includes(currCounty))
          if (eligibleFarmZones.length !== 0){
            currProgramPoints += criteria.points
          }
        }
      }
      if (currProgramPoints >0){
        this.eligiblePrograms.push(program)
        program.currentPointsForProgram = currProgramPoints
      }
    }
  }
}

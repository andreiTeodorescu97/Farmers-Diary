import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { Criteria } from "app/_models/farm/criteria";
import { FinancingProgram } from "app/_models/farm/financingprogram";
import { FarmService } from "app/_services/farm.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-financing-program",
  templateUrl: "./financing-program.component.html",
  styleUrls: ["./financing-program.component.css"],
})
export class FinancingProgramComponent implements OnInit {
  @Input() program: FinancingProgram;
  @Input() editableProgram: boolean = false;
  modalRefAdd: BsModalRef;
  modalRefEdit: BsModalRef;
  needsQuantity: boolean = false;
  disabledQuantity: boolean = true;
  disabledType: boolean = false;
  criteriaCategories = [
    "Dimensiune",
    "Cultura",
    "Animale",
    "Ingrasaminte",
    "Zona",
  ];
  selectedCategory: string = "";
  newCriteria = { needsType: true, needsQuantity: false } as Criteria;
  maxPoints: number = 0

  constructor(
    private modalService: BsModalService,
    private farmService: FarmService
  ) {}

  getMaximumPointsForProgram(){
    let sum = 0
    for (let criteria of this.criteriaCategories){
      let allWithCriteria = this.program.criteria.filter(c => c.category === criteria)
      if (allWithCriteria.length !== 0){
        const pointsValues = Math.max(...allWithCriteria.map(c => c.points)) 
        sum += pointsValues
      }
    }
    this.maxPoints = sum
  }

  ngOnInit(): void {
    this.getMaximumPointsForProgram()
  }

  addCriteriaModal(template: TemplateRef<any>) {
    this.modalRefAdd = this.modalService.show(template);
    this.needsQuantity = false;
    this.disabledQuantity = true;
  }

  addCriteria() {
    this.program.criteria.push(this.newCriteria);
    this.modalRefAdd.hide()
    this.getMaximumPointsForProgram()
  }

  addSingleCriteriaModal(template: TemplateRef<any>) {
    this.modalRefAdd = this.modalService.show(template);
  }

  editSingleCriteriaModal(template: TemplateRef<any>){
    this.modalRefEdit = this.modalService.show(template)
  }

  disableType(value) {
    if (value == false) {
      this.disabledType = true;
    } else {
      this.disabledType = false;
    }
  }

  changeQuantityNeed(value) {
    this.needsQuantity = value;
    if (value == false) {
      this.disabledQuantity = true;
    } else {
      this.disabledQuantity = false;
    }
  }
}

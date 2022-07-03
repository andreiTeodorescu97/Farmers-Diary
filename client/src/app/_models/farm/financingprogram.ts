import { Criteria } from "./criteria";

export interface IFinancingProgram {
  id: number;
  name: string;
  description: string;
  criteria: Criteria[];
  currentPointsForProgram?: number;
}

export class FinancingProgram implements IFinancingProgram {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public criteria: Criteria[],
    public currentPointsForProgram: number=0,
  ) {}
}

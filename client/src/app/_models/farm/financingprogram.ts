import { Criteria } from "./criteria";

export interface IFinancingProgram {
  id: number;
  name: string;
  description: string;
  criteria: Criteria[];
}

export class FinancingProgram implements IFinancingProgram {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public criteria: Criteria[]
  ) {}
}

export interface ICriteria {
  id: number;
  name: string;
  category: string;
  points: number;
  needsType: boolean;
  type?: string[];
  needsQuantity: boolean;
  minAmount?: number;
  maxAmount?: number;
}

export class Criteria implements ICriteria {
  constructor(
    public id: number,
    public name: string,
    public category: string,
    public points: number,
    public needsType: boolean = true,
    public type: string[] = [],
    public needsQuantity: boolean = false,
    public minAmount: number = 0,
    public maxAmount: number = 0,
  ) {}
}

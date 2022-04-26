export interface ICriteria {
  id: number;
  name: string;
  amount: any;
}

export class Criteria implements ICriteria {
  constructor(public id: number, public name: string, public amount: any) {}
}

export interface Temperature {
  Metric: Metric;
  Imperial: Metric;
}

export interface Metric {
  Value: number;
  Unit: string;
  UnitType: number;
}

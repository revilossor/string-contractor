export interface Model {
  short: string;
  long: string;
}

export enum ContractionType {
  Short = 'short',
  Long = 'long'
}

export interface HitLocation {
  start: number;
  end: number;
}

export interface Hit {
  type: ContractionType;
  model: Model;
  target: string;
  location: HitLocation
}

export type State = Array<ContractionType>

export interface Model {
  short: string;
  long: string;
}

export enum Type {
  Short = 'short',
  Long = 'long'
}

export interface Location {
  start: number;
  length: number;
  end: number;
}

export interface Match {
  type: Type;
  model: Model;
  target: string;
  location: Location;
}

export type State = Array<Type>
export type Matches = Array<Array<Match>>

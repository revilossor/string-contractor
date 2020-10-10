import { Type } from "./types";

export class BinaryStates {

  public items: Array<Array<Type>> = []

  public constructor(length: number) {
    this.generate(length)
  }

  private generate(
    length:number,
    working: Array<Type> = [],
    position = 0
  ): void {
    if(position === length) {
      if(working.length > 0) { this.items.push(working) }
      return
    }

    this.generate(length, [ ...working, Type.Short ], position + 1)
    this.generate(length, [ ...working, Type.Long ], position + 1)
  }

  public get length():number { return this.items.length }

}

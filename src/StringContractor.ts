import { Interpolator } from "./Interpolator"
import { Matcher } from "./Matcher"
import { Type } from "./types"
import { contractions } from './contractions'

export class StringContractor {
  private matcher:Matcher

  constructor() {
    this.matcher = new Matcher(...contractions)
  }

  public expand(input:string): Array<string> {
    const matches = this.matcher.match(input)
    const interpolator = new Interpolator(...matches)
    const state = new Array(matches.length).fill(Type.Long)
    return interpolator.interpolate(state)
  }

  public contract(input:string): Array<string> {
    const matches = this.matcher.match(input)
    const interpolator = new Interpolator(...matches)
    const state = new Array(matches.length).fill(Type.Short)
    return interpolator.interpolate(state)
  }

  public all(input:string): Array<string> {
    return []
  }
}

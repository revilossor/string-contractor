import { Match, State } from "./types";

export class Interpolator {
  private matches: Array<Match> = []
  public constructor(...matches: Array<Match>) {
    this.matches.push(...matches)
  }

  private generate(state: State): string {
    if(state.length !== this.matches.length) {
      throw Error('expected state.length === matches.length')
    }
    let offset = 0
    return this.matches.reduce((
      working: string,
      match:Match,
      index: number
    ) => {
      const chars = Array.from(working)
      const replacement = Array.from(match.model[state[index]])
      chars.splice(match.location.start + offset, match.location.length, ...replacement)
      offset += replacement.length - match.location.length
      return chars.join('')
    }, this.matches[0].target)
  }

  public interpolate(...states:Array<State>): Array<string> {
    if(this.matches.length === 0) { return [] }
    return states.map(this.generate.bind(this))
  }
}

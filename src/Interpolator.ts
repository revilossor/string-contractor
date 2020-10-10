import { Matches, State } from "./types";

export class Interpolator {
  private matches: Matches = []
  public constructor(...matches: Matches) {
    this.matches.push(...matches)
  }

  private generate(
    target: string,
    state: State = [],
    matches: Matches = [],
    offset = 0
  ): Array<string> {
    if(state.length == 0) { return [ target ]; }
    const [ targetType, ...remainingState ] = state
    const [ targetMatches, ...remainingMatches ] = matches
    return targetMatches.reduce((output: Array<string>, match) => {
      const chars = Array.from(target)
      const replacement = Array.from(match.model[targetType])
      chars.splice(match.location.start + offset, match.location.length, ...replacement)
      return [
        ...output,
        ...this.generate(
          chars.join(''),
          remainingState,
          remainingMatches,
          offset + (replacement.length - match.location.length)
        )
      ]
    }, [])
  }

  public interpolate(...states:Array<State>): Array<string> {
    if(this.matches.length === 0) { return [] }
    if(states.find(state => state.length !== this.matches.length)) {
      throw Error('expected state.length === matches.length')
    }
    const results = states.reduce((all:Array<string>, state: State) => [
      ...all,
      ...this.generate(
        this.matches[0][0].target,
        state,
        this.matches
      )
    ], [])
    return Array.from(new Set(results))
  }
}

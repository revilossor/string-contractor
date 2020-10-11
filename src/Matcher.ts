import { Match, Matches, Model, Type } from "./types";

export class Matcher {
  private list: Array<Model> = []

  public constructor(...items: Array<Model>) {
    this.list.push(...items)
  }

  private groupByIndex(matches: Array<Match>): Matches {
    const map = matches.reduce((
      groups: Map<number, Array<Match>>,
      match: Match
    ) => {
      const group = groups.get(match.location.start)
      group
        ? group.push(match)
        : groups.set(match.location.start, [ match ])
      return groups
    }, new Map<number, Array<Match>>())
    return Array.from(map.values()).sort((a, b) => {
      return a[0].location.start - b[0].location.start
    })
  }

  private pruneGroups(matches: Matches): Matches {
    return matches.map(group => {
      const sorted = group.sort((a, b) =>
        b.location.length - a.location.length
      )
      return sorted.filter(match =>
        match.location.length === sorted[0].location.length
      )
    })
  }

  private getMatches(target: string, type: Type, model: Model): Array<Match> {
    const length = model[type].length
    const results = Array.from(
      target.matchAll(new RegExp(model[type], 'gi'))
    )
    return results.reduce((
      matches: Array<Match>,
      { index }: RegExpMatchArray
    ) => {
      if(index !== undefined) {
        matches.push({
          type,
          model,
          target,
          location: {
            start: index,
            length,
            end: index + length
          }
        })
      }
      return matches
    }, [])
  }

  public match(target: string): Matches {
    const getTargetMatches = this.getMatches.bind(this, target)
    const matches = this.list.reduce((
      matches: Array<Match>,
      model: Model
    ) => [
      ...matches,
      ...getTargetMatches(Type.Short, model),
      ...getTargetMatches(Type.Long, model)
    ], [])
    return this.pruneGroups(
      this.groupByIndex(matches)
    )
  }
}

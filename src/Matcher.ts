import { Match, Model, Type } from "./types";

export class Matcher {
  private list: Array<Model> = []

  public constructor(...items: Array<Model>) {
    this.list.push(...items)
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

  public match(target: string): Array<Match> {
    const getTargetMatches = this.getMatches.bind(this, target)

    return this.list.reduce((
      matches: Array<Match>,
      model: Model
    ) => [
      ...matches,
      ...getTargetMatches(Type.Short, model),
      ...getTargetMatches(Type.Long, model)
    ], [])
  }
}

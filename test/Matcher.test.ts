import { Model, Type } from '../src/types'
import { Matcher } from '../src/Matcher'

describe('Given some Models', () => {
  const list: Array<Model> = [
    { short: "tiny", long: "quite large" },
    { short: "very small", long: "big" }
  ]

  describe('And a Matcher for the Models', () => {
    let matcher:Matcher

    beforeEach(() => {
      matcher = new Matcher(...list)
    })

    describe('When I search for matches in a string', () => {
      describe('And the string is empty', () => {
        it('Then the result contains no matches', () => {
          expect(matcher.match('')).toHaveLength(0)
        })
      })
      describe('And the string is only whitespace', () => {
        it('Then the result contains no matches', () => {
          expect(matcher.match('   ')).toHaveLength(0)
        })
      })
      describe('And the string contains no matches', () => {
        it('Then the result contains no matches', () => {
          expect(matcher.match('some random string')).toHaveLength(0)
        })
      })
      describe('And the string contains a short match', () => {
        it('Then the result contains the correct matches', () => {
          const string = "a very small string"
          expect(matcher.match(string)).toEqual([
            [{
              type: Type.Short,
              model: list[1],
              target: string,
              location: {
                start: 2,
                length: 10,
                end: 12
              }
            }]
          ])
        })
      })
      describe('And the string contains a long match', () => {
        it('Then the result contains the correct matches', () => {
          const string = "a quite large string"
          expect(matcher.match(string)).toEqual([
            [
              {
                type: Type.Long,
                model: list[0],
                target: string,
                location: {
                  start: 2,
                  length: 11,
                  end: 13
                }
              }
            ]
          ])
        })
      })
      describe('And there is a match at the start of the string', () => {
        it('Then the result contains the correct matches', () => {
          const string = "very small string"
          expect(matcher.match(string)).toEqual([
            [
              {
                type: Type.Short,
                model: list[1],
                target: string,
                location: {
                  start: 0,
                  length: 10,
                  end: 10
                }
              }
            ]
          ])
        })
      })
      describe('And the string contains multiple matches of different types', () => {
        it('Then the result contains the correct matches, in index order', () => {
          const string = "very small, tiny, big and quite large"
          expect(matcher.match(string)).toEqual([
            [
              {
                type: Type.Short,
                model: list[1],
                target: string,
                location: {
                  start: 0,
                  length: 10,
                  end: 10
                }
              }
            ],
            [
              {
                type: Type.Short,
                model: list[0],
                target: string,
                location: {
                  start: 12,
                  length: 4,
                  end: 16
                }
              }
            ],
            [
              {
                type: Type.Long,
                model: list[1],
                target: string,
                location: {
                  start: 18,
                  length: 3,
                  end: 21
                }
              }
            ],
            [
              {
                type: Type.Long,
                model: list[0],
                target: string,
                location: {
                  start: 26,
                  length: 11,
                  end: 37
                }
              }
            ]
          ])
        })
      })
      describe('And the string contains multiple matches of the same model type', () => {
        it('Then the result contains the correct matches', () => {
          const string = "big, big, big"
          expect(matcher.match(string)).toEqual([
            [
              {
                type: Type.Long,
                model: list[1],
                target: string,
                location: {
                  start: 0,
                  length: 3,
                  end: 3
                }
              }
            ],
            [
              {
                type: Type.Long,
                model: list[1],
                target: string,
                location: {
                  start: 5,
                  length: 3,
                  end: 8
                }
              }
            ],
            [
              {
                type: Type.Long,
                model: list[1],
                target: string,
                location: {
                  start: 10,
                  length: 3,
                  end: 13
                }
              }
            ]
          ])
        })
      })
    })

  })
})

describe('Given some Models that overlap', () => {
  const list: Array<Model> = [
    { short: 'want', long: 'need' },
    { short: "ASAP", long: "as soon as possible" },
    { short: "A.S.A.P.", long: "as soon as possible" }
  ]

  describe('And a Matcher for the Models', () => {
    let matcher:Matcher

    beforeEach(() => {
      matcher = new Matcher(...list)
    })

    describe('When I search for matches in a string', () => {
      it('Then overlapping matches are grouped', () => {
        const string = "I need it as soon as possible"
        expect(matcher.match(string)).toEqual([
          [{
            type: Type.Long,
            model: list[0],
            target: string,
            location: {
              start: 2,
              length: 4,
              end: 6
            }
          }],
          [
            {
              type: Type.Long,
              model: list[1],
              target: string,
              location: {
                start: 10,
                length: 19,
                end: 29
              }
            },
            {
              type: Type.Long,
              model: list[2],
              target: string,
              location: {
                start: 10,
                length: 19,
                end: 29
              }
            }
          ]
        ])
      })
    })
  })
})

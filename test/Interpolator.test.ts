import { Interpolator } from '../src/Interpolator'
import { Model, Type } from '../src/types'

describe('Given some Matches for a string against some Models', () => {
  const list: Array<Model> = [
    { short: "very small", long: "big" },
    { short: "tiny", long: "quite large" }
  ]
  const string = "very small, tiny, big and quite large"
  const matches = [
    {
      type: Type.Short,
      model: list[0],
      target: string,
      location: {
        start: 0,
        length: 10,
        end: 10
      }
    },
    {
      type: Type.Short,
      model: list[1],
      target: string,
      location: {
        start: 12,
        length: 4,
        end: 16
      }
    },
    {
      type: Type.Long,
      model: list[0],
      target: string,
      location: {
        start: 18,
        length: 3,
        end: 21
      }
    },
    {
      type: Type.Long,
      model: list[1],
      target: string,
      location: {
        start: 26,
        length: 11,
        end: 37
      }
    }
  ]
  describe('And an Interpolator for the Matches', () => {
    let interpolator:Interpolator

    beforeEach(() => {
      interpolator = new Interpolator(...matches)
    })

    describe('When I interpolate a State', () => {
      describe('And the State has a different length to the Matches', () => {
        it('Then an informative error is thrown', () => {
          const error = Error('expected state.length === matches.length')
          expect(() => interpolator.interpolate([])).toThrow(error)
          expect(() => interpolator.interpolate([
            Type.Long,
            Type.Long,
            Type.Long,
          ])).toThrow(error)
          expect(() => interpolator.interpolate([
            Type.Long,
            Type.Long,
            Type.Long,
            Type.Long,
            Type.Long,
          ])).toThrow(error)
        })
      })
      describe('And there are no Matches', () => {
        it('Then an empty array is returned', () => {
          const emptyInterpolator = new Interpolator()
          expect(emptyInterpolator.interpolate([])).toEqual([])
        })
      })
      it('Then the correct result is returned', () => {
        expect(interpolator.interpolate(
          [Type.Long, Type.Long, Type.Long, Type.Long]
        )).toEqual([
          "big, quite large, big and quite large"
        ])
      })
    })
    describe('When I interpolate multiple States', () => {
      describe('And one of the States has a different length to the Matches', () => {
        it('Then an informative error is thrown', () => {
          const error = Error('expected state.length === matches.length')
          expect(() => interpolator.interpolate(
            [Type.Long, Type.Long, Type.Long, Type.Long],
            [],
            [Type.Long, Type.Long, Type.Long, Type.Long]
          )).toThrow(error)
        })
      })
      describe('And there are no Matches', () => {
        it('Then an empty array is returned', () => {
          const emptyInterpolator = new Interpolator()
          expect(emptyInterpolator.interpolate([], [], [])).toEqual([])
        })
      })
      it('Then the correct result is returned', () => {
        expect(interpolator.interpolate(
          [Type.Long, Type.Long, Type.Long, Type.Long],
          [Type.Short, Type.Short, Type.Short, Type.Short],
          [Type.Long, Type.Short, Type.Long, Type.Short],
        )).toEqual([
          "big, quite large, big and quite large",
          "very small, tiny, very small and tiny",
          "big, tiny, big and tiny"
        ])
      })
    })

  })
})

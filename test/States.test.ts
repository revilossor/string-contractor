import { States } from '../src/States'
import { Type } from '../src/types'

describe.each([
  [
    0,
    []
  ],
  [
    1,
    [
      [Type.Short],
      [Type.Long]
    ]
  ],
  [
    2,
    [
      [Type.Short, Type.Short],
      [Type.Long, Type.Short],
      [Type.Short, Type.Long],
      [Type.Long, Type.Long],
    ]
  ],
  [
    3,
    [
      [Type.Short, Type.Short, Type.Short],
      [Type.Long, Type.Short, Type.Short],
      [Type.Short, Type.Long, Type.Short],
      [Type.Short, Type.Short, Type.Long],
      [Type.Long, Type.Long, Type.Short],
      [Type.Long, Type.Short, Type.Long],
      [Type.Short, Type.Long, Type.Long],
      [Type.Long, Type.Long, Type.Long],
    ]
  ],
])('When I get the states for %s matches', (length, expected) => {
  it('Then the correct states are returned', () => {
    const states = new States(length)
    expect(states).toHaveLength(expected.length)
    expect(states.items).toEqual(
      expect.arrayContaining(expected)
    )
  })
})

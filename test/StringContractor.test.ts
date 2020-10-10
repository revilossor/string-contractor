import { StringContractor } from '../src/StringContractor'

describe('Given a StringContractor', () => {
  let contractor:StringContractor

  beforeEach(() => {
    contractor = new StringContractor()
  })

  describe.each([
    ["", []],
    ["hello world", []],
    [
      "sorry, it's gone",
      [
        "sorry, it is gone",
        "sorry, it has gone"
      ]
    ],
    [
      "I'm not sure it's something she'd say",
      [
        "I am not sure it has something she had say",
        "I am not sure it has something she would say",
        "I am not sure it is something she had say",
        "I am not sure it is something she would say"
      ]
    ],
  ])('When I get the expanded version of "%s"', (input, expected) => {
    let result: Array<string>

    beforeEach(() => {
      result = contractor.expand(input)
    })

    it(`Then I receive ${expected.length} results`, () => {
      expect(result).toHaveLength(expected.length)
      expect(result).toEqual(expect.arrayContaining(expected))
    })

    expected.forEach(string => {
      it(`Then I receive "${string}"`, () => {
        expect(result).toHaveLength(expected.length)
        expect(result).toEqual(expect.arrayContaining(expected))
      })
    })
  })
})

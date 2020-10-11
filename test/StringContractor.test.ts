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
      "he couldn't've",
      [
        "he could not have"
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
    [
      "he ain't finna gimme 'cause he couldn't've",
      [
        "he am not fixing to give me because he could not have",
        "he am not going to give me because he could not have",
        "he did not fixing to give me because he could not have",
        "he did not going to give me because he could not have",
        "he have not fixing to give me because he could not have",
        "he have not going to give me because he could not have",
        "he has not fixing to give me because he could not have",
        "he has not going to give me because he could not have",
        "he are not fixing to give me because he could not have",
        "he are not going to give me because he could not have",
        "he is not fixing to give me because he could not have",
        "he is not going to give me because he could not have"
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

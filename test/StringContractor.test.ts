import { StringContractor } from '../src/StringContractor'

describe('Given a StringContractor', () => {
  let contractor:StringContractor

  beforeEach(() => {
    contractor = new StringContractor()
  })

  describe('When I get an expanded version', () => {
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
    ])('And the input is "%s"', (input, expected) => {
      let result: Array<string>

      beforeEach(() => {
        result = contractor.expand(input)
      })

      it(`Then I receive ${expected.length} results`, () => {
        expect(result).toHaveLength(expected.length)
        expect(result).toEqual(expect.arrayContaining(expected))
      })

      expected.forEach(string => {
        it(`And I receive "${string}"`, () => {
          expect(result).toHaveLength(expected.length)
          expect(result).toEqual(expect.arrayContaining(expected))
        })
      })
    })
  })

  describe('When I get a contracted version', () => {
    describe.each([
      ["", []],
      ["hello world", []],
      [
        "sorry, it has gone",
        [
          "sorry, it's gone"
        ]
      ],
      [
        "he could not have",
        [
          "he couldn't've"
        ]
      ],
      [
        "I am not",
        [
          "I ain't",
          "I amn't",
        ]
      ],
      [
        "I am not sure it is something she would say",
        [
          "I ain't sure it's something she'd say",
          "I ain't sure 'tis something she'd say",
          "I amn't sure it's something she'd say",
          "I amn't sure 'tis something she'd say"
        ]
      ],
      [
        "he is not going to give me because he could not have",
        [
          "he ain't finna gimme 'cause he couldn't've",
          "he ain't gonna gimme 'cause he couldn't've",
          "he isn't finna gimme 'cause he couldn't've",
          "he isn't gonna gimme 'cause he couldn't've"
        ]
      ],
    ])('When I get the contracted version of "%s"', (input, expected) => {
      let result: Array<string>

      beforeEach(() => {
        result = contractor.contract(input)
      })

      it(`Then I receive ${expected.length} results`, () => {
        expect(result).toHaveLength(expected.length)
        expect(result).toEqual(expect.arrayContaining(expected))
      })

      expected.forEach(string => {
        it(`And I receive "${string}"`, () => {
          expect(result).toHaveLength(expected.length)
          expect(result).toEqual(expect.arrayContaining(expected))
        })
      })
    })
  })

  describe('When I get all versions', () => {
    describe.each([
      ["", []],
      ["hello world", []],
      [
        "I'm sorry, it's gone",
        [
          "I'm sorry, it's gone",
          "I'm sorry, it has gone",
          "I'm sorry, it is gone",
          "I am sorry, it's gone",
          "I am sorry, it has gone",
          "I am sorry, it is gone"
        ]
      ],
      [
        "I am sorry, it has gone",
        [
          "I'm sorry, it's gone",
          "I'm sorry, it has gone",
          "I am sorry, it's gone",
          "I am sorry, it has gone"
        ]
      ]

    ])('And the input is "%s"', (input, expected) => {
      let result: Array<string>

      beforeEach(() => {
        result = contractor.all(input)
      })

      it(`Then I receive ${expected.length} results`, () => {
        expect(result).toHaveLength(expected.length)
        expect(result).toEqual(expect.arrayContaining(expected))
      })

      expected.forEach(string => {
        it(`And I receive "${string}"`, () => {
          expect(result).toHaveLength(expected.length)
          expect(result).toEqual(expect.arrayContaining(expected))
        })
      })
    })
  })

})

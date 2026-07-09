import Square from '../../src/chapter_IntroductionToOOP_JS/trial-12-Square.js'

test('GetSide', () => {
  const square = new Square(4)
  const actual = square.getSide()
  expect(actual).toBe(4)
})

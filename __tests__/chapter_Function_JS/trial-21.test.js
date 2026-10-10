import calcShipsCount from '../../src/chapter_Function_JS/trial-21.js'

test('ships count', () => {
  const battleField1 = []
  const battleField2 = [[1]]
  const battleField3 = [[0]]
  const battleField4 = [
    [0, 0, 1],
    [0, 0, 0],
    [1, 1, 0],
  ]
  const battleField5 = [
    [0, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0],
  ]

  expect(calcShipsCount(battleField1)).toBe(0)
  expect(calcShipsCount(battleField2)).toBe(1)
  expect(calcShipsCount(battleField3)).toBe(0)
  expect(calcShipsCount(battleField4)).toBe(2)
  expect(calcShipsCount(battleField5)).toBe(5)
})

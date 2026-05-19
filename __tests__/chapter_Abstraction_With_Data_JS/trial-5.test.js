import * as rect from '../../src/chapter_Abstraction_With_Data_JS/trial-5.js'

test('rectangle', () => {
  const p = rect.makeDecartPoint(0, 1)
  const rectangle = rect.makeRectangle(p, 4, 5)
  expect(rect.containsOrigin(rectangle)).toBe(false)
  const startPoint = rect.getStartPoint(rectangle)
  expect(rect.getX(startPoint)).toBe(0)
  expect(rect.getY(startPoint)).toBe(1)
  expect(rect.getWidth(rectangle)).toBe(4)
  expect(rect.getHeight(rectangle)).toBe(5)
})

test('renctangle1', () => {
  const p = rect.makeDecartPoint(-4, 3)
  const rectangle = rect.makeRectangle(p, 5, 4)
  expect(rect.containsOrigin(rectangle)).toBe(true)

  const rectangle2 = rect.makeRectangle(p, 2, 2)
  expect(rect.containsOrigin(rectangle2)).toBe(false)

  const rectangle3 = rect.makeRectangle(p, 2, 4)
  expect(rect.containsOrigin(rectangle3)).toBe(false)

  const rectangle4 = rect.makeRectangle(p, 4, 3)
  expect(rect.containsOrigin(rectangle4)).toBe(false)

  const rectangle5 = rect.makeRectangle(p, 5, 2)
  expect(rect.containsOrigin(rectangle5)).toBe(false)
})

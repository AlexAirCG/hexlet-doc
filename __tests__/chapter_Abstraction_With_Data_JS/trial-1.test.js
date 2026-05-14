import calculateDistance from '../../src/chapter_Abstraction_With_Data_JS/trial-1.js'

test('calculeteDistance', () => {
  const point1 = [0, 0]
  const point2 = [3, 4]
  expect(calculateDistance(point1, point2)).toBe(5)
})

/*
point1 = [0, 0]
point2 = [3, 4]
calculateDistance(point1, point2) // 5
// */

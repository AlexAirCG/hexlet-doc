import getMidPoint from '../../src/chapter_Abstraction_With_Data_JS/trial-2.js'

test('getMidPoint', () => {
  const point1 = { x: 0, y: 0 }
  const point2 = { x: 4, y: 4 }
  expect(getMidPoint(point1, point2)).toEqual({ x: 2, y: 2 })
})

test('getMidpoint2', () => {
  const point1 = { x: -1, y: 10 }
  const point2 = { x: 0, y: -3 }
  expect(getMidPoint(point1, point2)).toEqual({ x: -0.5, y: 3.5 })
})

/*
const point1 = { x: 0, y: 0 }
const point2 = { x: 4, y: 4 }
const point3 = getMidpoint(point1, point2)
console.log(point3) // => { x: 2, y: 2 };
// */

import {
  makeDecartPoint,
  getX,
  getY,
  makeSegment,
  getBeginPoint,
  getEndPoint,
  getMispointOfSegment,
  reflectPoint,
} from '../../src/chapter_Abstraction_With_Data_JS/trial-3.js'

test('makeDecartPoint', () => {
  const points = makeDecartPoint(2, 3)
  expect(getX(points)).toBe(2)
  expect(getY(points)).toBe(3)
})

test('makeSegment', () => {
  const point1 = makeDecartPoint(2, 4)
  const point2 = makeDecartPoint(4, 8)
  const segment = makeSegment(point1, point2)
  expect(getBeginPoint(segment)).toEqual(point1)
  expect(getEndPoint(segment)).toEqual(point2)
})

test('getMidpointOfSegment', () => {
  const point1 = makeDecartPoint(2, 4)
  const point2 = makeDecartPoint(6, 8)
  const segment = makeSegment(point1, point2)
  const midpoint = getMispointOfSegment(segment)
  expect(getX(midpoint)).toBe(4)
  expect(getY(midpoint)).toBe(6)
})

test('reflectPoint', () => {
  const point = makeDecartPoint(2, 3)
  const minPoint = reflectPoint(point)
  expect(getX(minPoint)).toBe(-2)
  expect(getY(minPoint)).toBe(-3)
})

/*
Реализуйте и экспортируйте указанные ниже функции:

- makeSegment(). Принимает на вход две точки и возвращает отрезок.
- getMidpointOfSegment(). Принимает на вход отрезок и возвращает точку находящуюся на середине отрезка.
- getBeginPoint(). Принимает на вход отрезок и возвращает точку начала отрезка.
- getEndPoint(). Принимает на вход отрезок и возвращает точку конца отрезка.

Пример

```js
const beginPoint = makeDecartPoint(3, 2)
const endPoint = makeDecartPoint(0, 0)
segment = makeSegment(beginPoint, endPoint)

getMidpointOfSegment(segment) // (1.5, 1)
getBeginPoint(segment) // (3, 2)
getEndPoint(segment) // (0, 0)
// */
/*
const makeDecartPoint = (x, y) => {
  const point = { x, y }
  return point
}

const getX = (point) => point.x
const getY = (point) => point.y
// */

/*
import {
  makeDecartPoint,
  makeSegment,
  getBeginPoint,
  getEndPoint,
  getMidpointOfSegment,
} from '../../src/chapter_Abstraction_With_Data_JS/trial-3.js'

describe('segment', () => {
  test('get begin & end points', () => {
    const beginPoint = makeDecartPoint(3, 2)
    const endPoint = makeDecartPoint(0, 0)
    const segment = makeSegment(beginPoint, endPoint)
    expect(getBeginPoint(segment)).toEqual(beginPoint)
    expect(getEndPoint(segment)).toEqual(endPoint)
  })

  test('get midpoint of segment 1', () => {
    const segment = makeSegment(makeDecartPoint(3, 2), makeDecartPoint(0, 0))
    expect(getMidpointOfSegment(segment)).toEqual(makeDecartPoint(1.5, 1))
  })

  test('get midpoint of segment 2', () => {
    const segment2 = makeSegment(makeDecartPoint(3, 2), makeDecartPoint(2, 3))
    expect(getMidpointOfSegment(segment2)).toEqual(makeDecartPoint(2.5, 2.5))
  })
})
// */

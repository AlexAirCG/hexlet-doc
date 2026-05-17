/*
 СОЗДАНИЕ АБСТРАКЦИИ

Отрезок — еще один графический примитив. В коде описывается парой точек, одна из которых — начало отрезка, другая — конец. Обычный отрезок не имеет направления, поэтому вы сами вольны выбирать то, какую точку считать началом, а какую концом.

В этом задании вам нужно самостоятельно создать абстракции и принять решение о том, как они будут реализованы. Напомню, что сделать это можно разными способами и нет одного правильного.

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
```
// */

/*
const makeDecartPoint = (x, y) => {
  const point = { x, y }
  console.log(point)
  return point
}

const getX = (point) => {
  return point.x
}
const getY = (point) => {
  return point.y
}

const makeSegment = (beginPoint, endPoint) => {
  return { start: beginPoint, end: endPoint }
}

const getBeginPoint = (segment) => {
  console.log(segment)
  return segment.start
}

const getEndPoint = (segment) => {
  return segment.end
}

const getMidpointOfSegment = (segment) => {
  const start = getBeginPoint(segment)
  const end = getEndPoint(segment)

  const midX = (getX(start) + getX(end)) / 2
  const midY = (getY(start) + getY(end)) / 2

  console.log(makeDecartPoint(midX, midY))

  return makeDecartPoint(midX, midY)
}

export {
  makeSegment,
  getBeginPoint,
  getEndPoint,
  getMidpointOfSegment,
  makeDecartPoint,
  getX,
  getY,
}

// */

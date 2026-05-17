const makePoint = (x, y) => {
  const point = {
    angle: Math.atan2(y, x),
    radius: Math.sqrt(x ** 2 + y ** 2),
  }

  return point
}

// BEGIN (write your solution here)
const getX = (point) => Math.round(point.radius * Math.cos(point.angle))
const getY = (point) => Math.round(point.radius * Math.sin(point.angle))
// END

const makeSegment = (point1, point2) => {
  const segment = { beginPoint: point1, endPoint: point2 }
  return segment
}

const getBeginPoint = (segment) => segment.beginPoint

const getEndPoint = (segment) => segment.endPoint

const isParallelWithX = (segment) => {
  const beginPoint = getBeginPoint(segment)
  const endPoint = getEndPoint(segment)

  return getY(beginPoint) === getY(endPoint)
}

const isParallelWithY = (segment) => {
  const beginPoint = getBeginPoint(segment)
  const endPoint = getEndPoint(segment)

  return getX(beginPoint) === getX(endPoint)
}

export { makeSegment, isParallelWithX, isParallelWithY, makePoint }

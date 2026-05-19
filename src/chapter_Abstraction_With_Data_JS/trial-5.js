// teacher solution
//*
export const makeDecartPoint = (x, y) => ({ x, y })
export const getX = (point) => point.x
export const getY = (point) => point.y

export const getQuadrant = (point) => {
  const x = getX(point)
  const y = getY(point)

  if (x > 0 && y > 0) {
    return 1
  }
  if (x < 0 && y > 0) {
    return 2
  }
  if (x < 0 && y < 0) {
    return 3
  }
  if (x > 0 && y < 0) {
    return 4
  }

  return null
}

export const makeRectangle = (point, width, height) => {
  return { point, width, height }
}

export const getStartPoint = (rectangle) => rectangle.point
export const getWidth = (rectangle) => rectangle.width
export const getHeight = (rectangle) => rectangle.height

export const containsOrigin = (rectangle) => {
  const point1 = getStartPoint(rectangle)
  const point2 = makeDecartPoint(
    getX(point1) + getWidth(rectangle),
    getY(point1) - getHeight(rectangle),
  )

  return getQuadrant(point1) === 2 && getQuadrant(point2) === 4
}
// */

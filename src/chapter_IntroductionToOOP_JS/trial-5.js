function getX() {
  return this.x
}
function getY() {
  return this.y
}

function Point(x, y) {
  this.x = x
  this.y = y
  this.getX = getX
  this.getY = getY
}

function getBeginPoint() {
  return this.beginPoint
}
function getEndPoint() {
  return this.endPoint
}

function Segment(beginPoint, endPoint) {
  this.beginPoint = beginPoint
  this.endPoint = endPoint
  this.getBeginPoint = getBeginPoint
  this.getEndPoint = getEndPoint
}

const solution = (segment) => {
  const originalBegin = segment.getBeginPoint()
  const originalEnd = segment.getEndPoint()

  const newBeginPoint = new Point(originalEnd.getX(), originalEnd.getY())
  const newEndPoint = new Point(originalBegin.getX(), originalBegin.getY())

  return new Segment(newBeginPoint, newEndPoint)
}

export { Point, Segment }

export default solution

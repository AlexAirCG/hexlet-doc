/*
const makePoint = (x, y) => ({ x, y })

const getX = (point) => point.x
const getY = (point) => point.y

const point = makePoint(3, 4) // мы не знаем как устроена точка
console.log(getY(point))
// */

/*
const makePoint = (x, y) => {
  // конвертация
  return {
    angle: Math.atan2(y, x),
    radius: Math.sqrt(x ** 2 + y ** 2),
  }
}

const getAngle = (point) => point.angle
const getRadius = (point) => point.radius

const point = makePoint(3, 4)
console.log(getAngle(point), getRadius(point))
// */

/*
const user = { name: 'Alex', birthYear: 1979 }

const getAge = (person) => {
  const currentYear = new Date().getFullYear()
  return currentYear - person.birthYear
}

console.log(user.name, getAge(user))
// */

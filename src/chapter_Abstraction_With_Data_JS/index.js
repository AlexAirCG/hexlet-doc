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

//*
const makeRational = (numer, denom) => `${numer}/${denom}`
const getNumer = (rational) => rational.split('/')[0]
const getDenom = (rational) => rational.split('/')[1]

const num = makeRational(1, 2)
const numer = getNumer(num)
const denom = getDenom(num)
console.log(num)
console.log(numer)
console.log(denom)

const mul = (rational1, rational2) => {
  return makeRational(
    getNumer(rational1) * getNumer(rational2),
    getDenom(rational1) * getDenom(rational2),
  )
}

console.log(mul('1/2', '2/3'))

const sum = (rational1, rational2) => {
  const n1 = getNumer(rational1)
  const d1 = getDenom(rational1)
  const n2 = getNumer(rational2)
  const d2 = getDenom(rational2)

  const resultNumer = n1 * d2 + n2 * d1
  const resultDenom = d1 * d2

  return makeRational(resultNumer, resultDenom)
}

console.log(sum('1/2', '2/3'))

const f = (rational1, rational2) => {
  const rational3 = sum(rational1, rational2)
  const denom = getDenom(rational3)
  const numer = getNumer(rational3)
  console.log(`Numer: ${numer}`)
  console.log(`Denom: ${denom}`)
}

f('1/2', '2/3')
// */

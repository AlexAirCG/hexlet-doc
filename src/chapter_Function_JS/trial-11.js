const smallestDivisor = (num) => {
  if (num < 2) return num
  if (num % 2 === 0) return 2

  const iter = (acc) => {
    if (acc ** 2 > num) {
      return num
    }

    if (num % acc === 0) {
      return acc
    }

    return iter(acc + 2)
  }

  return iter(3)
}

console.log(smallestDivisor(1)) // (1)
console.log(smallestDivisor(3)) // (3)
console.log(smallestDivisor(4)) // (2)
console.log(smallestDivisor(8)) // (2)
console.log(smallestDivisor(9)) // (3)
console.log(smallestDivisor(17)) // (17)
console.log(smallestDivisor(15)) // (3)
console.log(smallestDivisor(121)) // (11)

export default smallestDivisor

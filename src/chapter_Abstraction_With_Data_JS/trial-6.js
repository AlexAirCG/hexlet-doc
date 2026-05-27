const getGcd = (a, b) => (b === 0 ? Math.abs(a) : getGcd(b, a % b))

export const makeRational = (numer, denom) => {
  const commonDivisor = getGcd(numer, denom)
  let normolizeNumer = numer / commonDivisor
  let normolizeDenom = denom / commonDivisor

  if (normolizeDenom < 0) {
    normolizeNumer = -normolizeNumer
    normolizeDenom = -normolizeDenom
  }

  return { numer: normolizeNumer, denom: normolizeDenom }
}
export const getNumer = (rational) => rational.numer
export const getDenom = (rational) => rational.denom

export const add = (rational1, rational2) => {
  const n1 = getNumer(rational1)
  const d1 = getDenom(rational1)
  const n2 = getNumer(rational2)
  const d2 = getDenom(rational2)

  const resultNumer = n1 * d2 + n2 * d1
  const resultDenom = d1 * d2

  return makeRational(resultNumer, resultDenom)
}

export const sub = (rational1, rational2) => {
  const n1 = getNumer(rational1)
  const d1 = getDenom(rational1)
  const n2 = getNumer(rational2)
  const d2 = getDenom(rational2)

  const resultNumer = n1 * d2 - n2 * d1
  const resultDenom = d1 * d2

  return makeRational(resultNumer, resultDenom)
}

export const ratToString = (rat) => {
  return `${getNumer(rat)}/${getDenom(rat)}`
}

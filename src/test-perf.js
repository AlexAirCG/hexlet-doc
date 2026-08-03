// 1. Первое решение (Оптимальное - мутирует аккумулятор)
const normalizeFast = (colls) =>
  colls
    .map(({ name, country }) => ({
      city: name.trim().toLowerCase(),
      country: country.trim().toLowerCase(),
    }))
    .map(({ city, country }) => [country, city])
    .sort()
    .reduce((acc, [country, city]) => {
      const citiesAcc = acc[country] ?? []
      const cities = citiesAcc.concat(city)
      acc[country] = [...new Set(cities)]
      return acc
    }, {})

// 2. Второе решение (Медленное - копирует через спред { ...acc })
const normalizeSlow = (colls) =>
  colls
    .map(({ name, country }) => ({
      city: name.trim().toLowerCase(),
      country: country.trim().toLowerCase(),
    }))
    .map(({ city, country }) => [country, city])
    .sort()
    .reduce((acc, [country, city]) => {
      const citiesAcc = acc[country] ?? []
      const cities = citiesAcc.concat(city)
      const uniqueCities = new Set(cities)
      return { ...acc, [country]: [...uniqueCities] }
    }, {})

// ГЕНЕРИРУЕМ БОЛЬШОЙ МАССИВ ДАННЫХ (25 000 городов)
const countries = ['russia', 'usa', 'france', 'germany', 'china']
const bigData = Array.from({ length: 25000 }, (_, i) => ({
  name: ` City_${i} `,
  country: ` ${countries[i % countries.length]} `,
}))

console.log('--- Старт теста производительности на 25 000 элементов ---')

// Замеряем быстрое решение
console.time('Быстрое решение (без спреда)')
normalizeFast(bigData)
console.timeEnd('Быстрое решение (без спреда)')

// Замеряем медленное решение
console.time('Медленное решение (со спредом)')
normalizeSlow(bigData)
console.timeEnd('Медленное решение (со спредом)')

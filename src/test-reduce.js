// Моделируем готовую структуру: 20 000 уникальных ключей
const cleanData = Array.from({ length: 5000 }, (_, i) => ({
  key: `key_${i}`,
  value: `value_${i}`,
}))

console.log('--- Чистый тест reduce на 5000 УНИКАЛЬНЫХ ключей ---')

// 1. Быстрый вариант (мутация)
console.time('Мутация acc[key] = ...')
cleanData.reduce((acc, item) => {
  acc[item.key] = item.value
  return acc
}, {})
console.timeEnd('Мутация acc[key] = ...')

// 2. Медленный вариант (спред)
console.time('Спред { ...acc }')
cleanData.reduce((acc, item) => {
  return { ...acc, [item.key]: item.value }
}, {})
console.timeEnd('Спред { ...acc }')

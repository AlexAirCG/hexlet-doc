/*
const convert = (coll) => {
  const result = {}

  for (const [key, value] of coll) {
    result[key] = value
  }

  return result
}
// */

/*
const convert = (coll) => {
  return coll.reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})
}
// */

/*
const convert = (coll) => {
  if (!Array.isArray(coll)) {
    return coll
  }

  return coll.reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? convert(value) : value
    return acc
  }, {})
}
// */

const convert = (tree) =>
  tree.reduce((acc, node) => {
    const [key, value] = node
    const newValue = Array.isArray(value) ? convert(value) : value
    return { ...acc, [key]: newValue }
  }, {})

export default convert

console.log(
  convert([
    ['key', [['key2', 'anotherValue']]],
    ['key2', 'value2'],
  ]),
) // { key: { key2: 'anotherValue' }, key2: 'value2' }

/*
const convert = (tree) =>
    // 1. Извлечь из текущего узла дерева (node) имя ключа и его значение через деструктуризацию
    // 2. Проверить значение: если это массив, запустить для него convert рекурсивно, иначе — оставить как есть
    // 3. Создать новый объект: скопировать туда весь прошлый аккумулятор (...acc) и добавить новый динамический ключ [key]
    // 4. Вернуть этот новый созданный объект для следующего шага
  }, {}) // 5. Передать пустой объект {} в качестве стартовой точки для метода reduce

// */

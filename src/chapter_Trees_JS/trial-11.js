import _ from 'lodash'

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount
    const currentIndent = replacer.repeat(indentSize)
    const bracketIndent = replacer.repeat(indentSize - spacesCount)

    if (!_.isObject(currentValue)) {
      return `${currentValue}`
    }

    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
    )

    return ['{', ...lines, `${bracketIndent}}`].join('\n')
  }

  return iter(value, 1)
}

// console.log(stringify('hello')) // hello - значение приведено к строке, но не имеет кавычек

const data = { hello: 'world', is: true, nested: { count: 5 } }
console.log(stringify(data, '.', 2)) // то же самое что stringify(data, ' ', 1);

export default stringify

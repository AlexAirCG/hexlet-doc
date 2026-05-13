import _ from 'lodash'

const functions = {
  right: _.filter,
  wrong1: (coll) => coll,
}

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right'
  return functions[name]
}

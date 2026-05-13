import right from './right/index.js'
import wrong1 from './wrong/index.js'

const implementations = {
  right,
  wrong1,
}

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right'
  return implementations[name]
}

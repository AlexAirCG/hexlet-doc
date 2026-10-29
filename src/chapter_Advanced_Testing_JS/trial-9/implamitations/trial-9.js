import loadConfig from './rigth/index.js'

const implementations = {
  right: loadConfig,
}

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right'
  return implementations[name]
}

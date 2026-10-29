import utils from '../../utils.js'

const loadConfig = (filePath) => {
  const content = utils.readFile(filePath)
  return JSON.parse(content)
}

export default loadConfig

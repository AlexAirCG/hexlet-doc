import getRight from './right/get.js'
import indexOfRight from './right/indexOf.js'
import sliceRigth from './right/slice.js'

import getWrong1 from './wrong1/get.js'
import indexOfWrong1 from './wrong1/indexOf.js'
import sliceWrong1 from './wrong1/slice.js'

import getWrong2 from './wrong2/get.js'
import indexOfWrong2 from './wrong2/indexOf.js'
import sliceWrong2 from './wrong2/slice.js'

import getWrong3 from './wrong3/get.js'
import indexOfWrong3 from './wrong3/indexOf.js'
import sliceWrong3 from './wrong3/slice.js'

const implementations = {
  right: {
    get: getRight,
    indexOf: indexOfRight,
    slice: sliceRigth,
  },
  wrong1: {
    get: getWrong1,
    indexOf: indexOfWrong1,
    slice: sliceWrong1,
  },
  wrong2: {
    get: getWrong2,
    indexOf: indexOfWrong2,
    slice: sliceWrong2,
  },
  wrong3: {
    get: getWrong3,
    indexOf: indexOfWrong3,
    slice: sliceWrong3,
  },
}

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right'
  return implementations[name]
}

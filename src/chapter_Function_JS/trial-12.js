//*
import _ from 'lodash'

const cons = (list, el) => _.union(list, [el])

const merge = (...coll) => _.mergeWith({}, ...coll, cons)

export default merge

console.log(merge({ a: 1, b: 2 }, { a: 3 }))
// { a: [1, 3], b: [2] }
// */

/*
const merge = (...coll) => {
  const result = {}

  coll.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (!result[key]) {
        result[key] = new Set()
      }
      result[key].add(value)
    })
  })

  Object.keys(result).forEach((key) => {
    result[key] = Array.from(result[key])
  })

  return result
}

export default merge

console.log(merge({ a: 1, b: 2 }, { a: 3 }, { c: 4 }))
// { a: [1, 3], b: [2] }
// */

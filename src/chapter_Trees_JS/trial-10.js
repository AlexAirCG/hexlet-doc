/*
const sortDeps = (list) => {
  const visited = new Set()
  const result = []

  const visit = (node) => {
    if (visited.has(node)) return
    visited.add(node)

    if (list[node]) {
      list[node].forEach(visit)
    }
    result.push(node)
  }

  Object.keys(list).forEach(visit)

  return result
}
// */

//*
const sortDeps = (deps) => {
  const add = (acc, node) => {
    const subDeps = deps[node] || []
    const subAcc = subDeps.reduce(add, {})
    return { ...acc, ...subAcc, [node]: true }
  }
  const set = Object.keys(deps).reduce(add, {})
  return Object.keys(set)
}
// */

export default sortDeps

//*
const deps1 = {
  mongo: [],
  tzinfo: ['thread_safe'],
  uglifier: ['execjs'],
  execjs: ['thread_safe', 'json'],
  redis: [],
}

console.log(sortDeps(deps1))
// => ['mongo', 'thread_safe', 'tzinfo', 'json', 'execjs', 'uglifier', 'redis'];
// */

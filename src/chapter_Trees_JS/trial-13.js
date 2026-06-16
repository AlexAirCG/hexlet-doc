const tree = [
  'A',
  [
    ['B', [['D']]],
    ['C', [['E'], ['F']]],
  ],
]

// const tree2 = ['B', [['A', [['C', [['E'], ['F']]]]], ['D']]]

/*
const makeJoints = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent].filter(
    (neighbor) => neighbor && !Array.isArray(neighbor),
  )

  const joints = children.reduce(
    (acc, child) => ({ ...acc, ...makeJoints(child, leaf) }),
    {},
  )

  return { [leaf]: neighbors, ...joints }
}

const transformer = (tree, node) => {
  const joints = makeJoints(tree)

  const buildTree = (current, parent) => {
    const neighbors = joints[current]

    const childrenNames = neighbors.filter((neighbor) => neighbor !== parent)

    if (childrenNames.length === 0) {
      return [current]
    }

    const childrenTree = childrenNames.map((child) => buildTree(child, current))

    return [current, childrenTree]
  }

  return buildTree(node)
}

export default transformer
// */

// solution theacher
//*
const makeJoints = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent].filter(
    (neighbor) => neighbor && !Array.isArray(neighbor),
  )

  return {
    [leaf]: neighbors,
    ...children.reduce(
      (acc, child) => ({ ...acc, ...makeJoints(child, leaf) }),
      {},
    ),
  }
}

const buildTreeFromLeaf = (joints, leaf) => {
  const iter = (current, acc) => {
    const checked = [...acc, current]
    const neighbors = joints[current]
      .filter((n) => !checked.includes(n))
      .map((n) => iter(n, checked))

    return neighbors.length === 0 ? [current] : [current, neighbors]
  }

  return iter(leaf, [])
}

const transformer = (tree, leaf) => {
  const joints = makeJoints(tree)
  return buildTreeFromLeaf(joints, leaf)
}

export default transformer
console.log(transformer(tree, 'B'))

// */

/*
const buildTreeFromLeaf = (joints, leaf) => {
  const iter = (current, acc) => {
    // 1. Создать новую историю пути, добавив текущий город к уже пройденным городам (аккумулятору)
    // 2. Достать из графа список всех соседей для текущего города
    // 3. Отфильтровать соседей: убрать из списка те города, в которых мы уже побывали (которые есть в истории)
    // 4. Запустить рекурсию (iter) для каждого оставшегося соседа, превращая их в поддеревья через метод map
    // 5. Проверить результат: если список поддеревьев пуст — вернуть массив только с текущим городом. 
    //    Иначе — вернуть массив, где на первом месте текущий город, а на втором — массив его детей.
  }

  // 6. Запустить функцию iter, передав ей новый корень (leaf) и пустой массив для старта истории
}
// */

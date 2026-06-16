const branch1 = [
  'A',
  [
    //   A
    [
      'B',
      [
        //   |
        ['C'], //   B
        ['D'], //  / \
      ],
    ], // C   D
  ],
]

const branch2 = [
  'B',
  [
    //   B
    [
      'D',
      [
        //   |
        ['E'], //   D
        ['F'], //  / \
      ],
    ], // E   F
  ],
]

const branch3 = [
  'I',
  [
    //   I
    [
      'A',
      [
        //   |
        [
          'B',
          [
            //   A
            ['C'], //   |
            ['H'], //   B
          ],
        ], //  / \
      ],
    ], // C   H
  ],
]

/*
const makeJoint = (tree, parent) => {
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
    ...children.reduce((acc, c) => ({ ...acc, ...makeJoint(c, leaf) }), {}),
  }
}

const buildTree = (joints, current, parent = null) => {
  const neighbors = joints[current] || []
  const childrenNames = neighbors.filter((n) => n !== parent)

  if (childrenNames.length === 0) {
    return [current]
  }

  const childrenTree = childrenNames.map((child) =>
    buildTree(joints, child, current),
  )

  return [current, childrenTree]
}

const puzzle = (...branches) => {
  const [firstBranch] = branches
  const [rootName] = firstBranch

  const allGraph = branches.map((branch) => makeJoint(branch))

  const commonGraph = {}

  for (const graph of allGraph) {
    for (const [node, neighbors] of Object.entries(graph)) {
      if (!commonGraph[node]) {
        commonGraph[node] = []
      }

      const uniqueNeighbors = new Set([...commonGraph[node], ...neighbors])
      commonGraph[node] = Array.from(uniqueNeighbors)
    }
  }

  return buildTree(commonGraph, rootName)
}
// */

//*

// */
import { union } from 'es-toolkit'
import { mergeWith } from 'es-toolkit/compat'

const makeJoints = (tree, parent) => {
  const [leaf, children] = tree

  if (!children) {
    return { [leaf]: [parent] }
  }

  const flatChildren = children.flat()
  const neighbors = [...flatChildren, parent].filter(
    (n) => n && !Array.isArray(n),
  )

  return {
    [leaf]: neighbors,
    ...children.reduce((acc, c) => ({ ...acc, ...makeJoints(c, leaf) }), {}),
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

const puzzle = (...branches) => {
  const [first] = branches
  const [root] = first

  const joints = branches.reduce((acc, branch) => {
    const jointsFromBranch = makeJoints(branch)
    return mergeWith(acc, jointsFromBranch, (a, b) => union(a ?? [], b ?? []))
  }, {})

  return buildTreeFromLeaf(joints, root)
}

export default puzzle

console.log(puzzle(branch1, branch2, branch3))

/*
const puzzle = (...branches) => {
  // 1. Достать из списка всех веток (массива branches) самую первую ветку
  // 2. Достать имя корневого узла этой первой ветки — это будущий корень всего дерева
  // 3. Запустить метод reduce, чтобы обойти все переданные ветки и собрать их в один общий объект joints:
  //    - На каждой итерации превратить текущую ветку в плоский граф связей через makeJoints
  //    - Склеить накопленный граф (acc) и граф текущей ветки с помощью функции mergeWith
  //    - Если города в графах пересекаются, объединить их массивы соседей без дублей через функцию union
  // 4. Передать собранный общий граф joints и главный корень в функцию buildTreeFromLeaf
  // 5. Вернуть итоговое объединенное дерево, которое построит функция buildTreeFromLeaf
}
// */

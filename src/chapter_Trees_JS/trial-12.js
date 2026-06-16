const tree = [
  'Moscow',
  [
    ['Smolensk'],
    ['Yaroslavl'],
    [
      'Voronezh',
      [
        ['Liski'],
        ['Boguchar'],
        ['Kursk', [['Belgorod', [['Borisovka']]], ['Kurchatov']]],
      ],
    ],
    ['Ivanovo', [['Kostroma'], ['Kineshma']]],
    ['Vladimir'],
    ['Tver', [['Klin'], ['Dubna'], ['Rzhev']]],
  ],
]

/*
const itinerary = (maps, startCity, endCity) => {
  const findPath = (node, target, currentPath = []) => {
    const [cityName, children] = node
    const newPath = [...currentPath, cityName]

    if (cityName === target) {
      return newPath
    }

    if (children) {
      for (let child of children) {
        const path = findPath(child, target, newPath)
        if (path) return path
      }
    }

    return null
  }

  const path1 = findPath(maps, startCity)
  const path2 = findPath(maps, endCity)

  let i = 0
  while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
    i += 1
  }

  const upPath = path1.slice(i).reverse()
  const common = [path1[i - 1]]
  const downPath = path2.slice(i)

  return [...upPath, ...common, ...downPath]
}

console.log(itinerary(tree, 'Kurchatov', 'Rzhev'))
// ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']

export default itinerary
// */

//*
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

const findRoute = (start, finish, joints) => {
  const iter = (current, route) => {
    const routeToCurrent = [...route, current]

    if (current === finish) {
      return routeToCurrent
    }

    const neighbors = joints[current]
    const filtred = neighbors.filter((n) => !routeToCurrent.includes(n))

    return filtred.reduce((acc, n) => acc.concat(iter(n, routeToCurrent)), [])
  }

  return iter(start, [])
}

const itinerary = (tree, start, finish) => {
  const joints = makeJoints(tree)
  return findRoute(start, finish, joints)
}

export default itinerary

console.log(itinerary(tree, 'Smolensk', 'Yaroslavl'))
// [ 'Smolensk', 'Moscow', 'Voronezh', 'Kursk', 'Kurchatov' ]

// */

/*
const makeJoints = (tree, parent) => {
  // 1. Достать из дерева текущий город и его детей
  // 2. Если детей нет — вернуть объект, где текущий город связан с его родителем
  // 3. Если дети есть — собрать их в плоский список (на один уровень вниз)
  // 4. Добавить к детям родителя и очистить массив от undefined и вложенных массивов
  // 5. Запустить эту же функцию для каждого ребенка и склеить их объекты в один общий справочник
  // 6. Вернуть объект: связать текущий город со списком его соседей + подмешать справочник детей
}

const findRoute = (start, finish, joints) => {
  const iter = (current, route) => {
    // 1. Создать новый массив пути, добавив текущий город к уже пройденному маршруту
    // 2. Если текущий город равен финишу — вернуть этот новый массив пути (цель достигнута)
    // 3. Достать из графа joints массив всех соседей для текущего города
    // 4. Отфильтровать соседей: убрать те города, в которых мы уже побывали на текущем пути
    // 5. Перебрать оставшихся соседей: запустить для каждого iter и склеить результаты в один массив
  }

  // 6. Запустить функцию iter, передав ей стартовый город и пустой массив истории пути
}

const itinerary = (tree, start, finish) => {
  // 1. Передать исходное дерево в функцию makeJoints, чтобы получить плоский граф всех связей
  // 2. Передать старт, финиш и полученный граф в функцию findRoute для поиска пути
  // 3. Вернуть итоговый массив-маршрут, который найдет функция findRoute
}
// */

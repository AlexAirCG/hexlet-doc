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
    ...children.reduce(
      (acc, child) => ({ ...acc, ...makeJoints(child, leaf) }),
      {},
    ),
  }
}

const findRoute = (start, finish, joints) => {
  const iter = (current, route) => {
    const routeToCurrent = [...route, current]

    if (current === finish) {
      return routeToCurrent
    }

    const neighbors = joints[current]
    const filtered = neighbors.filter((n) => !routeToCurrent.includes(n))

    return filtered.reduce((acc, n) => acc.concat(iter(n, routeToCurrent)), [])
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

const makeJoints = (tree, parent) => {
  const [leaf, children] = tree // это чтобы разложить текущий узел дерева по полочкам, достав имя города в переменную leaf и массив его потомков в переменную children.

  if (!children) { // это чтобы проверить самый простой базовый случай: есть ли у этого города ветки-дети дальше.
    return { [leaf]: [parent] } // это чтобы в случае тупика (когда детей нет) сразу вернуть маленький справочник, где этот тупиковый город связан массивом со своим единственным родителем.
  } // это чтобы закрыть условие проверки тупика.

  const flatChildren = children.flat() // это чтобы сгладить массив детей на один уровень вниз и вытащить имена прямых подчинённых городов в один плоский список строк.
  const neighbors = [...flatChildren, parent].filter( // это чтобы объединить всех детей и родителя текущего города в один черновой массив и запустить сито-фильтр для его очистки.
    (n) => n && !Array.isArray(n), // это чтобы выбросить из списка соседей пустые значения (undefined у корня) и вложенные массивы с глубокими детьми, оставив только чистые строки-имена.
  ) // это чтобы закрыть метод фильтрации.

  return {
    [leaf]: neighbors, // это чтобы записать в итоговую карту строчку для текущего города, связав его имя с только что очищенным списком его прямых соседей.
    ...children.reduce((acc, c) => ({ ...acc, ...makeJoints(c, leaf) }), {}), // это чтобы отправить всех детей в рекурсию (где текущий город станет для них родителем), а затем с помощью трёх точек "растворить" скобки и ссыпать все их справочники в один наш большой итоговый объект.
  } // это чтобы закрыть возвращаемый объект.
} // это чтобы закрыть функцию makeJoints.

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

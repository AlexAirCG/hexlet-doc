/*
import {
  mkfile,
  mkdir,
  isDirectory,
  isFile,
  map,
} from '@hexlet/immutable-fs-trees'

isFile(mkfile('config')) // true
isDirectory(mkdir('etc')) // true

const tree = mkdir('etc', [mkfile('config'), mkfile('hosts')])

const callbackFn = (node) => {
  const { name } = node
  const newName = name.toUpperCase()
  return { ...node, name: newName }
}

console.log(map(callbackFn, tree))
// */

// Обновление содержимого директории
/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('oNe'),
  fsTrees.mkfile('Two'),
  fsTrees.mkdir('THREE'),
])

const children = fsTrees.getChildren(tree)
const newCildren = children.map((child) => {
  const name = fsTrees.getName(child)
  const newMeta = _.cloneDeep(fsTrees.getMeta(child))
  if (fsTrees.isDirectory(child)) {
    const children = [...fsTrees.getChildren(child)]
    return fsTrees.mkdir(name.toLowerCase(), children, newMeta)
  }
  return fsTrees.mkfile(name.toLowerCase(), newMeta)
})

const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newCildren, newMeta)

console.log(tree)
console.log(tree2)
// */

// Удаление файлов внутри директории
/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('oNe'),
  fsTrees.mkfile('Two'),
  fsTrees.mkdir('THREE'),
])

const children = fsTrees.getChildren(tree)
const newChildren = children.filter(fsTrees.isDirectory)
const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)

console.log(tree)
console.log(tree2)
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('my documents', [
  fsTrees.mkfile('avatar.jpg', { size: 100 }),
  fsTrees.mkfile('passport.jpg', { size: 200 }),
  fsTrees.mkfile('family.jpg', { size: 150 }),
  fsTrees.mkfile('addresses', { size: 125 }),
  fsTrees.mkdir('presentations'),
])

const compressImages = (tree) => {
  const children = fsTrees.getChildren(tree)
  const newChildren = children.map((child) => {
    const name = fsTrees.getName(child)
    if (fsTrees.isFile(child) && name.endsWith('.jpg')) {
      const meta = fsTrees.getMeta(child)
      // Клонируем старые метаданные и уменьшаем размер в 2 раза
      const newMeta = { ..._.cloneDeep(meta), size: meta.size / 2 }
      return fsTrees.mkfile(name, newMeta)
    }

    return child
  })
  const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
  return fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
}
const tree2 = compressImages(tree)
console.log(tree2.children)
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [fsTrees.mkfile('ls'), fsTrees.mkfile('cat')]),
])

const dfs = (tree) => {
  // Распечатываем содержимое узла
  console.log(fsTrees.getName(tree))
  // Если это файл, то возвращаем управление
  if (fsTrees.isFile(tree)) {
    return
  }

  // Получаем детей
  const children = fsTrees.getChildren(tree)

  // Применяем функцию dfs ко всем дочерним элементам
  // Множество рекурсивных вызовов в рамках одного вызова функции
  // называется древовидной рекурсией
  children.forEach(dfs)
}

// => /
// => etc
// => bashrc
// => consul.cfg
// => hexletrc
// => bin
// => ls
// => cat

const changeOwner = (tree, owner) => {

}

const result = changeOwner(tree, 'Alex')
console.log(result)
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [fsTrees.mkfile('ls'), fsTrees.mkfile('cat')]),
])

const changeOwner = (tree, owner) => {
  const name = fsTrees.getName(tree)
  const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
  newMeta.owner = owner

  if (fsTrees.isFile(tree)) {
    return fsTrees.mkfile(name, newMeta)
  }

  const children = fsTrees.getChildren(tree)
  const newChildren = children.map((child) => changeOwner(child, owner))
  const newTree = fsTrees.mkdir(name, newChildren, newMeta)

  return newTree
}

const result = changeOwner(tree, 'Alex')
console.log(result)
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [
    fsTrees.mkdir('aleks1', []),
    fsTrees.mkfile('ls'),
    fsTrees.mkfile('cat'),
  ]),
  fsTrees.mkfile('AlexAir'),
  fsTrees.mkdir('aleks2', []),
])

const getNodeCount = (tree) => {
  if (fsTrees.isFile(tree)) {
    return 1
  }

  const children = fsTrees.getChildren(tree)
  const descendantsCount = children.map((child) => getNodeCount(child))
  return 1 + _.sum(descendantsCount)
}

console.log(getNodeCount(tree))
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [
    fsTrees.mkdir('aleks1', []),
    fsTrees.mkfile('ls'),
    fsTrees.mkfile('cat'),
    fsTrees.mkdir('aleks3'),
  ]),
  fsTrees.mkfile('AlexAir'),
  fsTrees.mkdir('aleks2', []),
])

const getEmptyDir = (tree) => {
  const children = fsTrees.getChildren(tree)
  if (children.length === 0) {
    return 1
  }
  const childDir = children.filter(fsTrees.isDirectory)
  const count = childDir.map((empty) => getEmptyDir(empty))
  return _.sum(count)
}

console.log(getEmptyDir(tree))
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('.nginx.conf', { size: 800 })]),
    fsTrees.mkdir('.consul', [
      fsTrees.mkfile('.config.json', { size: 1200 }),
      fsTrees.mkfile('data', { size: 8200 }),
      fsTrees.mkfile('raft', { size: 80 }),
    ]),
  ]),
  fsTrees.mkfile('.hosts', { size: 3500 }),
  fsTrees.mkfile('resolve', { size: 1000 }),
])

const getHiddenFilesCount = (tree) => {
  const name = fsTrees.getName(tree)
  if (fsTrees.isFile(tree)) {
    return name.startsWith('.') ? 1 : 0
  }
  const children = fsTrees.getChildren(tree)
  const count = children.map(getHiddenFilesCount)
  return _.sum(count)
}

console.log(getHiddenFilesCount(tree)) // 3
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
  ]),
  fsTrees.mkdir('consul', [
    fsTrees.mkfile('config.json'),
    fsTrees.mkfile('file.tmp'),
    fsTrees.mkdir('data'),
  ]),
  fsTrees.mkfile('hosts'),
  fsTrees.mkfile('resolve'),
])

const getFilesCount = (node) => {
  if (fsTrees.isFile(node)) {
    return 1
  }
  const children = fsTrees.getChildren(node)
  const count = children.map((child) => getFilesCount(child))
  return _.sum(count)
}

const getSubdirectoriesInfo = (tree) => {
  const children = fsTrees.getChildren(tree)
  return children
    .filter(fsTrees.isDirectory)
    .map((child) => [fsTrees.getName(child), getFilesCount(child)])
}

console.log(getFilesCount(tree))
console.log(getSubdirectoriesInfo(tree))
// => [['etc', 1], ['consul', 2]]
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf', { size: 800 })]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json', { size: 1200 }),
      fsTrees.mkfile('data', { size: 8200 }),
      fsTrees.mkfile('raft', { size: 80 }),
    ]),
  ]),
  fsTrees.mkfile('hosts', { size: 3500 }),
  fsTrees.mkfile('resolve', { size: 1000 }),
])

const getFilesSizeCount = (node) => {
  if (fsTrees.isFile(node)) {
    const meta = _.cloneDeep(fsTrees.getMeta(node))
    return meta.size || 0
  }
  const children = fsTrees.getChildren(node)
  return _.sum(children.map(getFilesSizeCount))
}

const du = (tree) => {
  const children = fsTrees.getChildren(tree)

  const result = children.map((child) => {
    const name = fsTrees.getName(child)
    const size = getFilesSizeCount(child)

    return [name, size]
  })

  return _.sortBy(result)
}

console.log(du(tree))
// [
//   ['etc', 10280],
//   ['hosts', 3500],
//   ['resolve', 1000],
// ]
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json'),
      fsTrees.mkdir('data'),
    ]),
  ]),
  fsTrees.mkdir('logs'),
  fsTrees.mkfile('hosts'),
])

const findeEmptyDirPath = (tree) => {
  const name = fsTrees.getName(tree)
  const children = fsTrees.getChildren(tree)

  if (children.length === 0) {
    return name
  }

  const emptyDirName = children
    .filter((child) => !fsTrees.isFile(child))
    .flatMap(findeEmptyDirPath)

  return emptyDirName
}

console.log(findeEmptyDirPath(tree))
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json'),
      fsTrees.mkdir('data'),
    ]),
  ]),
  fsTrees.mkdir('logs'),
  fsTrees.mkfile('hosts'),
])

const findEmptyDirPath = (tree) => {
  const iter = (node, depth) => {
    const name = fsTrees.getName(node)
    const children = fsTrees.getChildren(node)

    if (children.length === 0) {
      return name
    }

    if (depth === 2) {
      return []
    }

    return children
      .filter(fsTrees.isDirectory)
      .flatMap((child) => iter(child, depth + 1))
  }

  return iter(tree, 0)
}

console.log(findEmptyDirPath(tree))
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf')]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json'),
      fsTrees.mkdir('data'),
    ]),
  ]),
  fsTrees.mkdir('logs'),
  fsTrees.mkfile('hosts'),
])

const findEmptyDirPath = (tree, maxDepth = 2) => {
  const iter = (node, depth, currentPath) => {
    const name = fsTrees.getName(node)
    const children = fsTrees.getChildren(node)

    const newPath = name === '/' ? '' : `${currentPath}/${name}`

    if (children.length === 0) {
      return newPath === '' ? '/' : newPath
    }

    if (depth === maxDepth) {
      return []
    }

    return children
      .filter(fsTrees.isDirectory)
      .flatMap((child) => iter(child, depth + 1, newPath))
  }
  return iter(tree, 0, '')
}

console.log(findEmptyDirPath(tree))
// */

/*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import path from 'path'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [fsTrees.mkfile('nginx.conf', { size: 800 })]),
    fsTrees.mkdir('consul', [
      fsTrees.mkfile('config.json', { size: 1200 }),
      fsTrees.mkfile('develop.config.json', { size: 1200 }),
      fsTrees.mkfile('data', { size: 8200 }),
      fsTrees.mkfile('raft', { size: 80 }),
    ]),
  ]),
  fsTrees.mkfile('hosts', { size: 3500 }),
  fsTrees.mkfile('resolve', { size: 1000 }),
])

const findFilesByName = (tree, substr) => {
  const iter = (node, currentPath) => {
    const name = fsTrees.getName(node)
    const newPath = path.join(currentPath, name)

    if (fsTrees.isFile(node)) {
      return name.includes(substr) ? newPath : []
    }

    const children = fsTrees.getChildren(node)
    return children.flatMap((child) => iter(child, newPath))
  }

  return iter(tree, '')
}

console.log(findFilesByName(tree, 'n'))
// */

/*
const sequenceSum = (begin, end) => {
  if (begin > end) return NaN
  if (begin === end) return begin
  return begin + sequenceSum(begin + 1, end)
}

console.log(sequenceSum(1, 5))
// */

/*
const htmlTree = {
  name: 'html',
  type: 'tag-internal',
  children: [
    {
      name: 'body',
      type: 'tag-internal',
      children: [
        {
          name: 'h1',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Сообщество',
            },
          ],
        },
        {
          name: 'p',
          type: 'tag-internal',
          children: [
            {
              type: 'text',
              content: 'Общение между пользователями Хекслета',
            },
          ],
        },
        {
          name: 'hr',
          type: 'tag-leaf',
        },
        {
          name: 'input',
          type: 'tag-leaf',
        },
        {
          name: 'div',
          type: 'tag-internal',
          className: 'hexlet-community',
          children: [
            {
              name: 'div',
              type: 'tag-internal',
              className: 'text-xs-center',
              children: [],
            },
            {
              name: 'div',
              type: 'tag-internal',
              className: 'fa fa-spinner',
              children: [],
            },
          ],
        },
      ],
    },
  ],
}

export const filterEmpty = (tree) => {
  const filtred = tree.children
    .map((node) => {
      if (node.type === 'tag-internal') {
        return filterEmpty(node)
      }
      return node
    })
    .filter((node) => {
      const { type } = node
      switch (type) {
        case 'tag-internal': {
          const { children } = node
          return children.length > 0
        }
        case 'tag-leaf': {
          return true
        }
        case 'text': {
          const { content } = node
          return !!content
        }
      }
    })
  return { ...tree, children: filtred }
}

const buildClass = (node) => (node.className ? ` class=${node.className}` : '')

export const buildHtml = (node) => {
  const { type, name } = node
  switch (type) {
    case 'tag-internal': {
      const childrenView = node.children.map(buildHtml).join('')
      return `<${name}${buildClass(node)}>${childrenView}</${name}>`
    }
    case 'tag-leaf': {
      return `<${name}${buildClass(node)}>`
    }
    case 'text': {
      return node.content
    }
  }
}

const filterTree = filterEmpty(htmlTree)
const html = buildHtml(filterTree)
console.log(html)
// */

//*

const tree = {
  name: 'div',
  type: 'tag-internal',
  className: 'hexlet-community',
  children: [
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
    {
      name: 'div',
      type: 'tag-internal',
      className: 'old-class',
      children: [],
    },
  ],
}

const changeClass = (tree, oldClass, newClass) => {
  const currentClass = tree.className === oldClass ? newClass : tree.className

  if (!tree.children) {
    return { ...tree, className: currentClass }
  }

  const updateChildren = tree.children.map((child) => {
    return changeClass(child, oldClass, newClass)
  })

  return {
    ...tree,
    className: currentClass,
    children: updateChildren,
  }
}

const result = changeClass(tree, 'old-class', 'new-class')
console.log(result)
// */

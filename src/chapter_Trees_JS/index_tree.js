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

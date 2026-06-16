import * as fsTrees from '@hexlet/immutable-fs-trees'
import { cloneDeep } from 'es-toolkit'

const downcaseFileNames = (tree) => {
  const name = fsTrees.getName(tree)
  const newName = name.toLowerCase()
  const newMeta = cloneDeep(fsTrees.getMeta(tree))

  if (fsTrees.isFile(tree)) {
    return fsTrees.mkfile(newName, newMeta)
  }

  const children = fsTrees.getChildren(tree)
  const newChildren = children.map((child) => downcaseFileNames(child))
  const newTree = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)

  return newTree
}

export default downcaseFileNames

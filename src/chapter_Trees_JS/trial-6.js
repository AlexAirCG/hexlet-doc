import { sum } from 'es-toolkit'
import * as fsTrees from '@hexlet/immutable-fs-trees'

const colculateFilesSize = (node) => {
  if (fsTrees.isFile(node)) {
    const meta = fsTrees.getMeta(node)
    return meta.size
  }

  const children = fsTrees.getChildren(node)
  const sizes = children.map(colculateFilesSize)
  return sum(sizes)
}

const du = (tree) => {
  const children = fsTrees.getChildren(tree)
  const result = children.map((child) => [
    fsTrees.getName(child),
    colculateFilesSize(child),
  ])
  return result.sort(([, size1], [, size2]) => size2 - size1)
}

export default du

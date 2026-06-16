import * as fsTrees from '@hexlet/immutable-fs-trees'
import path from 'path'

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

export default findFilesByName

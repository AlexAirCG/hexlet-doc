import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const getHiddenFilesCount = (node) => {
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return name.startsWith('.') ? 1 : 0
  }

  const children = fsTrees.getChildren(node)
  const hiddenFilesCounts = children.map((child) => getHiddenFilesCount(child))
  return _.sum(hiddenFilesCounts)
}

export default getHiddenFilesCount

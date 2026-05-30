import * as fsTrees from '@hexlet/immutable-fs-trees'
import { cloneDeep } from 'es-toolkit'

const compressImages = (node) => {
  const children = fsTrees.getChildren(node)
  const newChildren = children.map((child) => {
    const name = fsTrees.getName(child)
    if (!fsTrees.isFile(child) || !name.endsWith('.jpg')) {
      return child
    }
    const meta = fsTrees.getMeta(child)
    const newMeta = cloneDeep(meta)
    newMeta.size /= 2

    return fsTrees.mkfile(name, newMeta)
  })

  const newMeta = cloneDeep(fsTrees.getMeta(node))
  return fsTrees.mkdir(fsTrees.getName(node), newChildren, newMeta)
}

export default compressImages

/*
Реализуйте и экспортируйте функцию compressImages(), которая принимает на вход директорию, находит внутри нее картинки и "сжимает" их. Под сжиманием понимается уменьшение свойства size в метаданных в два раза. Функция должна вернуть новую директорию со сжатыми картинками и всеми остальными данными, которые были внутри этой директории. Проверять вложенные директории не нужно, то есть функция должна находить только те картинки, которые лежат в текущей, но не во внутренних директориях.
Картинками считаются все файлы заканчивающиеся на .jpg.
// */
/*
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

export default compressImages
// */

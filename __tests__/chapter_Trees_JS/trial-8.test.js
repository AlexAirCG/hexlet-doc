import { cloneDeep } from 'es-toolkit'
import trees from '../../__fixtures__/chapter_Trees_JS/index.js'
import changeClass from '../../src/chapter_Trees_JS/trial-8.js'

test.each(trees)('changeClass', (treeData) => {
  const { htmlTreeSource, htmlTree, classNameFrom, classNameTo } = treeData
  const sourceCloned = cloneDeep(htmlTreeSource)

  const result = changeClass(htmlTreeSource, classNameFrom, classNameTo)
  expect(result).toEqual(htmlTree)
  expect(htmlTreeSource).toEqual(sourceCloned)
})

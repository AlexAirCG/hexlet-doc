// my solution
/*
import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('eTc', [fsTrees.mkfile('config.json')]),
])

export const map = (f, tree) => {
  const updateNode = f(tree)

  if (updateNode.type === 'file') {
    return updateNode
  }

  const { children } = updateNode

  const updateChildren = []

  for (const child of children) {
    const updateChild = map(f, child)
    updateChildren.push(updateChild)
  }

  return { ...updateNode, children: updateChildren }
}

// Приводим имена всех директорий и файлов к верхнему регистру:

const result = map(
  (n) => ({ ...n, name: fsTrees.getName(n).toUpperCase() }),
  tree,
)
console.log(result)

export const filter = (f, tree) => {
  if (!f(tree)) {
    return null
  }

  if (tree.type === 'file') {
    return tree
  }

  const { children } = tree

  const filteredChildren = []

  for (const child of children) {
    const filteredChild = filter(f, child)

    if (filteredChild !== null) {
      filteredChildren.push(filteredChild)
    }
  }

  return { ...tree, children: filteredChildren }
}

// Отфильтровываем директории:

const filtered = filter((n) => fsTrees.isDirectory(n), tree)
console.log(filtered)

export const reduce = (f, tree, acc) => {
  let newAcc = f(acc, tree)

  if (tree.type === 'file') {
    return newAcc
  }

  const { children } = tree

  for (const child of children) {
    newAcc = reduce(f, child, newAcc)
  }

  return newAcc
}

// Подсчитываем количество узлов в дереве:

const result2 = reduce((acc) => acc + 1, tree, 0) // 3
console.log(result2)
// */

// ============================================================================
// teacher solution
// ============================================================================
// /*
import * as fsTrees from '@hexlet/immutable-fs-trees'
import { cloneDeep } from 'es-toolkit'

const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('eTc', [fsTrees.mkfile('config.json')]),
])

// =======================================
// map принимает на вход функцию-обработчик и дерево, а возвращает отображенное дерево.
// =======================================
export const map = (f, node) => {
  const nodeClone = cloneDeep(node)
  const updateNode = f(nodeClone)

  if (!fsTrees.isDirectory(updateNode)) {
    return updateNode
  }

  const name = fsTrees.getName(updateNode)
  const children = fsTrees.getChildren(updateNode)
  const processedChildren = children.map((child) => map(f, child))

  return fsTrees.mkdir(name, processedChildren)
}

// Приводим имена всех директорий и файлов к верхнему регистру:
const result = map(
  (n) => ({ ...n, name: fsTrees.getName(n).toUpperCase() }),
  tree,
)
console.log(result)

// export const map = (f, node) => {
//   // 1. Создать изолированную глубокую копию текущего узла (nodeClone) через cloneDeep, чтобы защитить оригинал от мутаций
//   // 2. Применить функцию-обработчик f к созданной копии и сохранить результат в переменную updatedNode
//   // 3. Базовый случай: Проверить библиотечной функцией, является ли узел директорией.
//   //    Если это НЕ директория (то есть файл) — сразу вернуть измененный узел updatedNode наружу
//   // 4. Если это директория — получить её имя с помощью fsTrees.getName(updatedNode)
//   // 5. Получить массив детей этой директории с помощью fsTrees.getChildren(updatedNode)
//   // 6. Запустить встроенный метод .map() по массиву детей, чтобы рекурсивно вызвать нашу функцию map(f, child) для каждого ребенка
//   // 7. Собрать и вернуть абсолютно новую директорию через fsTrees.mkdir, передав туда полученное имя и массив обработанных детей
// }

// ==========================================
// filter принимает в качестве параметров предикат и дерево, а возвращает отфильтрованное дерево по предикату.
// ==========================================
export const filter = (f, node) => {
  const nodeClone = cloneDeep(node)

  if (!f(node)) {
    return null
  }

  if (!fsTrees.isDirectory(node)) {
    return nodeClone
  }

  const name = fsTrees.getName(nodeClone)
  const children = fsTrees.getChildren(nodeClone)
  const processedChildren = children.map((n) => filter(f, n)).filter((v) => v)

  return fsTrees.mkdir(name, processedChildren)
}

// Отфильтровываем директории:
// const filtered = filter((n) => fsTrees.isDirectory(n), tree);

// export const filter = (f, node) => {
//   // 1. Создать изолированную глубокую копию текущего узла (nodeClone) с помощью cloneDeep
//   // 2. Проверить оригинальный узел предикатом f. Если вернулся false — вернуть null (узел и все его содержимое удаляется)
//   // 3. Базовый случай: Проверить, является ли узел директорией.
//   //    Если это НЕ директория (файл, который успешно прошел предикат в шаге 2) — вернуть сохраненную копию nodeClone
//   // 4. Если это выжившая директория — извлечь её имя из копии узла через fsTrees.getName
//   // 5. Извлечь её массив детей из копии узла через fsTrees.getChildren
//   // 6. Обработать детей цепочкой методов:
//   //    - Метод .map() рекурсивно вызывает filter(f, n) для каждого потомка (некоторые превратятся в null)
//   //    - Следующий за ним метод .filter((v) => v) автоматически выбрасывает из массива все значения null
//   // 7. Собрать и вернуть новую отфильтрованную директорию через fsTrees.mkdir с оригинальным именем и выжившими детьми
// }

// ============================================
// reduce кроме основных параметров (функция-обработчик и дерево) принимает также начальное значение аккумулятора.
// ============================================
export const reduce = (f, node, acc) => {
  const nodeClone = cloneDeep(node)
  let newAcc = f(acc, nodeClone)

  if (fsTrees.isFile(node)) {
    return newAcc
  }

  const children = fsTrees.getChildren(nodeClone)

  for (let child of children) {
    newAcc = reduce(f, child, newAcc)
  }

  return newAcc

  // return children.reduce((iAcc, child) => reduce(f, child, iAcc), newAcc)
}
const result2 = reduce((acc) => acc + 1, tree, 0) // 3
const result3 = reduce(
  (acc, n) => {
    if (fsTrees.isFile(n)) {
      return [...acc, fsTrees.getName(n)]
    }
    return acc
  },
  tree,
  [],
)
console.log(result2)
console.log(result3)
// export const reduce = (f, node, acc) => {
//   // 1. Создать глубокую копию текущего узла (nodeClone) с помощью библиотеки cloneDeep
//   // 2. Обновить аккумулятор, передав в функцию-обработчик старый acc и копию текущего узла: f(acc, nodeClone)
//   // 3. Базовый случай: Проверить библиотечной функцией fsTrees.isFile, является ли текущий узел файлом.
//   //    Если это файл — рекурсия для этой ветки окончена, сразу вернуть обновленный newAcc
//   // 4. Если это директория — получить её массив детей с помощью fsTrees.getChildren(nodeClone)
//   // 5. Запустить встроенный метод массивов .reduce() для перебора детей:
//   //    - Метод сам будет передавать аккумулятор (iAcc) от одного ребенка к другому
//   //    - Внутри колбэка рекурсивно вызывается наша функция reduce(f, child, iAcc)
//   //    - В качестве стартового значения для этого перебора передается текущий newAcc
//   // 6. Вернуть итоговое значение, которое соберет метод .reduce() после обхода всех детей
// }

// const reduce = (f, node, acc) => {
//   const nodeClone = cloneDeep(node) // это чтобы создать защищённую копию текущего узла и гарантировать, что чужая функция "f" случайно не испортит (не мутирует) наше оригинальное дерево.

//   let newAcc = f(acc, nodeClone) // это чтобы применить к текущему узлу правило (функцию "f"), которое попросил пользователь, и обновить наш счётчик/массив, сохранив свежий результат в переменную newAcc.

//   if (fsTrees.isFile(node)) {
//     // это чтобы проверить, является ли текущий узел обычным файлом (монолитным предметом, в который нельзя заглянуть внутрь).
//     return newAcc // это чтобы сразу вернуть наш обновлённый счётчик newAcc обратно наверх и завершить работу на этой ветке, так как у файла нет детей и считать дальше нечего.
//   } // это чтобы закрыть условие проверки файла.

//   const children = fsTrees.getChildren(nodeClone) // это чтобы открыть текущую папку (раз узел не оказался файлом) и достать из неё плоский список всех лежащих внутри коробчонков-детей.

//   for (let child of children) {
//     // это чтобы по очереди запустить перебор каждого извлечённого ребёнка из списка детей.
//     newAcc = reduce(f, child, newAcc) // это чтобы отправить текущего ребёнка в рекурсивный подсчёт, передав ему наш актуальный счётчик newAcc, и тут же перезаписать newAcc новой цифрой, которую вернёт этот ребёнок.
//   } // это чтобы закрыть цикл перебора детей.

//   return newAcc // это чтобы вернуть финальное, накопленное за весь цикл по всем детям значение счётчика newAcc на базу как итог работы.
// } // это чтобы закрыть функцию reduce.
// return children.reduce((iAcc, child) => reduce(f, child, iAcc), newAcc)
// */

// /*
// Подсчитываем количество узлов в дереве:

// */

/*
  ТРЕНАЖЕР: РАБОТА С ДЕРЕВЬЯМИ НА ЧИСТЫХ ЦИКЛАХ
  
// ============================================================================
// 1. ФУНКЦИЯ MAP (Отображение/трансформация дерева)
// ============================================================================
const map = (f, tree) => {
  // Шаг 1. Изменить текущий узел дерева с помощью функции-обработчика f
  // Шаг 2. Проверить базовый случай: если тип измененного узла это 'file', сразу вернуть его
  // Шаг 3. Извлечь массив детей (children) из измененного узла папки
  // Шаг 4. Создать пустой массив updatedChildren для хранения новых поддеревьев
  // Шаг 5. Запустить цикл for...of по массиву детей и внутри рекурсивно вызывать map(f, child),
  //        сохраняя возвращенные результаты через метод .push()
  // Шаг 6. Вернуть новый объект директории, заменив в нем оригинальных детей на массив updatedChildren
}

// ============================================================================
// 2. ФУНКЦИЯ FILTER (Фильтрация узлов дерева)
// ============================================================================
const filter = (f, tree) => {
  // Шаг 1. Проверить текущий узел предикатом f. Если вернулся false — вернуть null (узел удален)
  // Шаг 2. Базовый случай: Если тип узла это 'file', вернуть его (он прошел проверку, детей нет)
  // Шаг 3. Извлечь массив детей (children) из текущей директории
  // Шаг 4. Создать пустой массив filteredChildren для хранения отфильтрованных потомков
  // Шаг 5. Запустить цикл for...of по детям:
  //        - Рекурсивно вызвать filter(f, child) для каждого ребенка
  //        - Если результат не равен null (ребенок выжил), сохранить его в filteredChildren через .push()
  // Шаг 6. Вернуть новый объект директории, заменив оригинальных детей на массив filteredChildren
}

// ============================================================================
// 3. ФУНКЦИЯ REDUCE (Агрегация/сжатие дерева в одно значение)
// ============================================================================
const reduce = (f, tree, accumulator) => {
  // Шаг 1. Обновить значение аккумулятора, вызвав функцию-обработчик f(accumulator, tree)
  // Шаг 2. Базовый случай: если тип текущего узла это 'file', сразу вернуть этот обновленный аккумулятор
  // Шаг 3. Извлечь массив детей (children) из текущей директории
  // Шаг 4. Запустить цикл for...of по массиву детей:
  //        - На каждой итерации перезаписать переменную аккумулятора результатом рекурсивного
  //          вызова reduce(f, child, accumulator)
  // Шаг 5. Вернуть итоговый аккумулятор после полного завершения цикла по всем детям
}
// */

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

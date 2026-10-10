//* // ЦЕПОЧКА ПРОМИСОВ
import fsp from 'fs/promises'

const getTypeName = (stat) => (stat.isDirectory() ? 'directory' : 'file')

const getTypes = (filePath) => {
  const processPath = (result, filepath) =>
    fsp
      .stat(filepath)
      .then((data) => [...result, getTypeName(data)])
      .catch(() => [...result, null])

  return filePath.reduce(
    (promise, filepath) =>
      promise.then((result) => processPath(result, filepath)),
    Promise.resolve([]),
  )
}

export { getTypes }

getTypes(['./file1', './file2', './undefiend', './tmp']).then((data) =>
  console.log(data),
)

// */

/* // example
getTypes(['/etc', '/etc/hosts', '/undefined']).then(console.log)
// ['directory', 'file', null]
// */

/* // description
Реализуйте и экспортируйте в файле file.js асинхронную функцию getTypes(), которая анализирует список переданных путей и возвращает массив (в промисе), с описанием того, что находится по каждому из путей в виде строк 'directory' и 'file'.

Эта функция должна отрабатывать успешно в любом случае. Если во время выполнения асинхронной операции возникла ошибка, то значением для этого пути будет null. Для простоты считаем, что в эту функцию всегда передается как минимум один путь для обработки (иначе придется задействовать механизм, который проходится в курсах далее).

Подсказки

- fsPromises.stat - информация о файле или директории. Для проверки на директорию используйте метод isDirectory.
- Методы then и catch не меняют сам промис, а возвращают новый
// */

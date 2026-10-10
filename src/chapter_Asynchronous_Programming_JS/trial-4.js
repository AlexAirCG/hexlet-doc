//* // ОБРАБОТКА ОШИБОК
import fs from 'fs'

const move = (readFromFile, writeToFile, cb) => {
  fs.readFile(readFromFile, 'utf-8', (err1, data1) => {
    if (err1) {
      cb(err1)
      return
    }
    fs.writeFile(writeToFile, data1, (err2) => {
      if (err2) {
        cb(err2)
        return
      }
      fs.unlink(readFromFile, (err3) => {
        if (err3) {
          cb(err3)
          return
        }
        cb(null)
      })
    })
  })
}

export { move }

// move('./opt/myfile', './tmp/newfile', (data) => console.log(data))
// */

/* // example
move('/opt/myfile', '/tmp/newfile', (error) => {
  if (error) {
    console.log('oops')
    return
  }
  console.log('yes!')
})
// */

/* // description
Реализуйте и экспортируйте функцию move, которая асинхронно перемещает файл из одного места в другое. Ее параметры:

1. Путь до файла исходника
2. Путь по которому нужно копировать файл
3. Колбек, у которого единственный аргумент — ошибка.

Алгоритм работы функции следующий:

1. Читаем исходный файл
2. Создаём новый файл и записываем туда данные исходного файла (это важно сделать до попытки удаления исходного файла!)
3. Удаляем исходный файл

Реальная функция move устроена не так. Если исходник и приемник находятся на одном устройстве, то копирования не происходит, меняются лишь указатели в фс

Другие примеры смотрите в тестах

Подсказки

- fs.unlink - удаление файла
- fs.readFile - чтение файла
- fs.writeFile - запись в файл
// */

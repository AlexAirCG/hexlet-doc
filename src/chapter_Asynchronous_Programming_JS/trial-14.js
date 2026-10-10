//* // Waterfall
import fs from 'fs'
import async from 'async'

const { waterfall } = async

const unionFiles = (inputPath1, inputPath2, outputPath, cb) => {
  waterfall(
    [
      (callback) => fs.readFile(inputPath1, 'utf-8', callback),
      (data1, callback) => {
        fs.readFile(inputPath2, 'utf-8', (error, data2) => {
          if (error) {
            callback(error)
            return
          }
          callback(null, data1, data2)
        })
      },
      (data1, data2, callback) =>
        fs.writeFile(outputPath, `${data1}${data2}`, callback),
    ],
    cb,
  )
}

export { unionFiles }
// */

/* // example
import async from 'async'

const { waterfall } = async

waterfall([
  (callback) => callback(null, 2),
  (n, callback) => callback(null, n, n * 10),
  (n, m, callback) => callback(null, n + m),
], (err, result) => console.log(err, result))
// null 22
// */

/* // description
Реализуйте и экспортируйте в файле file.js функцию unionFiles(), которая асинхронно читает два файла и записывает их содержимое подряд в третий. Итоговый колбек cb функция передаёт в waterfall(), поэтому он получает ошибку любой операции или null после успешной записи. Вот её решение на вложенных колбеках.

```js
import fs from 'fs'

const unionFiles = (inputPath1, inputPath2, outputPath, cb) => {
  fs.readFile(inputPath1, 'utf-8', (error1, data1) => {
    if (error1) {
      cb(error1)
      return
    }
    fs.readFile(inputPath2, 'utf-8', (error2, data2) => {
      if (error2) {
        cb(error2)
        return
      }
      fs.writeFile(outputPath, `${data1}${data2}`, (error3) => {
        if (error3) {
          cb(error3)
          return
        }
        cb(null) // не забываем последний успешный вызов
      })
    })
  })
}
```

Подсказки

- Колбек шага и итоговый колбек cb это разные функции. Внутри шага вызывается колбек шага.
- Статья с разбором Waterfall: https://ru.hexlet.io/blog/posts/waterfall-ot-kolbekov-k-promisam
// */

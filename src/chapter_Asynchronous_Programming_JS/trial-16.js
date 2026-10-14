/* // Промисы: event loop

export default CustomPromise
// */

/* // description
В данном испытании вы реализуете собственную версию объекта Promise.

Необходимо создать в файле CustomPromise.js класс CustomPromise с цепочкой вызовов. В классе реализуйте метод then(onFulfill) и обеспечьте асинхронный вызов обработчиков. Обработчик из then() вызывается асинхронно, даже если промис уже выполнен, а сам промис меняет состояние сразу при вызове resolve(data).

Алгоритм
Используйте названия состояний из стандарта, так как они проверяются в тестах. Состояние хранится в поле экземпляра. До вызова resolve() оно равно 'pending', после вызова 'fulfilled'.

Метод then() возвращает новый CustomPromise, который выполняется значением, возвращённым обработчиком. Поэтому вызовы then() складываются в цепочку, а resolve() можно вызвать и позже, например из таймера.

В решении должны отсутствовать встроенные Promise и ключевое слово async. Только таймеры и вызовы функций из функций.

Примеры использования

```js
import CustomPromise from './CustomPromise.js'

const messages = []

const resolvedPromise = new CustomPromise((resolve) => {
  resolve('Сначала резолвим?')
})

const modifiedPromise = resolvedPromise.then(() => {
  messages.push('Сначала меняем статус.')
})

await modifiedPromise.then(() => {
  messages.push('А уже потом резолвим.')
})

console.log(messages.join(' ')) // Сначала меняем статус. А уже потом резолвим.

const delayedPromise = new CustomPromise((resolve) => {
  setTimeout(() => resolve('Resolved'), 100)
})

const result = await delayedPromise
  .then((message) => `New another ${message}`)
  .then((message) => message.toUpperCase())
console.log(result) // NEW ANOTHER RESOLVED
```

Подсказки
Задача опирается на возможности промисов, описанные в документации.
// */

/* // Звонящий таймер


export default makeTimer
// */

/* // description
Реализуйте и экспортируйте по умолчанию в файле timer.js функцию, которая возвращает объект-таймер. Таймер "заводится" на определенное время и запускается. Каждые 100 миллисекунд он вызывает колбек, передавая туда два параметра: state со значением working и elapsedTime содержащий прошедшее время со старта таймера (в миллисекундах). Когда таймер завершился, то он вызывает тот же колбек с параметром state и значением finished.

```js
// Колбек
const cb = ({ state, elapsedTime }) => {
  switch (state) {
    case 'working':
      console.log(`Time elapsed: ${elapsedTime}`)
      break
    case 'finished':
      console.log(`Timer has finished!`)
  }
}

// Создается объект-таймер
const timer = makeTimer(300, cb) // Завели на 300 миллисекунд
timer.start()
// Time elapsed: 100
// Time elapsed: 200
// Time elapsed: 300
// Timer has finished!
Тик, на котором прошедшее время превысило заданное, колбек со state working уже не получает. Вместо него приходит finished, поэтому таймер на 50 миллисекунд не отдаёт ни одного тика working.

const shortTimer = makeTimer(50, cb)
shortTimer.start()
// Timer has finished!
```

Подсказки

- Таймеры
  https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/timers/theory_unit
- Для запуска таймера используйте setInterval
- Для остановки clearInterval
- Каждый новый тик не должен никак влиять на другие тики. Данные должны быть изолированы 
// */

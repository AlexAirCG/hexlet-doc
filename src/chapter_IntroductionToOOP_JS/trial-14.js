//* // ГЕНЕРАТОР СЛУЧАЙНЫХ ЧИСЕЛ

// */

/* // example
const seq = new Random(100)
const result1 = seq.getNext()
const result2 = seq.getNext()

console.log(result1 !== result2) // true

seq.reset()

const result21 = seq.getNext()
const result22 = seq.getNext()

console.log(result1 === result21) // true
console.log(result2 === result22) // true
// */

/* // description
Реализуйте генератор случайных чисел, представленный классом Random. Интерфейс объекта включает в себя три функции:

- Конструктор. Принимает на вход seed, начальное число генератора псевдослучайных чисел.
- getNext() — метод, возвращающий новое случайное число.
- reset() — метод, сбрасывающий генератор на начальное значение.

Экспортируйте класс по умолчанию.

const a = 1103515245
const c = 12345
const m = 2147483648 
(a * this.seed + c) % m
// */

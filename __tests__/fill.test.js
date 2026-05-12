// Напишите тесты для функции fill(coll, value, start, end), которая заполняет элементы массива переданным значением, начиная со старта и заканчивая (но не включая) конечной позицией. Функция меняет исходный массив!

// Функция принимает следующие аргументы:

// coll — массив, элементы которого будут заполнены
// value — значение, которым будут заполнены элементы массива
// start — стартовая позиция, по умолчанию равна нулю
// end — конечная позиция, по умолчанию равна длине массива
// // все вызовы нужно рассматривать, как независимые

// const array =  [1, 2, 3, 4];

// fill(array, '*', 1, 3);
// console.log(array); // => [1, '*', '*', 4]

// fill(array, '*');
// console.log(array); // => ['*', '*', '*', '*']

// fill(array, '*', 4);
// console.log(array); // => [1, 2, 3, 4]

// fill(array, '*', 0, 10);
// console.log(array); // => ['*', '*', '*', '*']
import fill from '../src/fill.js'

let array

beforeEach(() => {
  array = [1, 2, 3, 4]
})

test('common case', () => {
  expect(fill(array, '*', 1, 3)).toEqual([1, '*', '*', 4])
})

test('should use default start and end', () => {
  expect(fill(array, '*')).toEqual(['*', '*', '*', '*'])
})

test('should work with start >= length', () => {
  expect(fill(array, '*', 10, 12)).toEqual([1, 2, 3, 4])
})

test('should work with start >= end', () => {
  expect(fill(array, '*', 2, 2)).toEqual([1, 2, 3, 4])
})

test('should work with end > length', () => {
  expect(fill(array, '*', 0, 10)).toEqual(['*', '*', '*', '*'])
})

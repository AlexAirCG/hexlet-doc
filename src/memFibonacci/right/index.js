import utils from '../utils.js'

const memo = {}

export default (n) => {
  // Создаем объект для хранения вычисленных значений
  if (n in memo) {
    return memo[n]
  }
  // Вычисляем и сохраняем результат в memo
  memo[n] = utils.fibonacci(n)
  return memo[n]
}

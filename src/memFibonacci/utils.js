const utils = {
  fibonacci(n) {
    // Проверка входного значения
    if (n < 0) {
      throw new Error('Введите положительное целое число')
    }
    // Базовые случаи
    if (n <= 1) {
      return n
    }
    return utils.fibonacci(n - 1) + utils.fibonacci(n - 2)
  },
}

export default utils

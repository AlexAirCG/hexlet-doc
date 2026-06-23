const make = (numer = 0, denom = 1) => {
  return {
    numer,
    denom,
    getNumer() {
      return this.numer
    },
    getDenom() {
      return this.denom
    },
    setNumer(value) {
      this.numer = value
    },
    setDenom(value) {
      this.denom = value
    },
    toString() {
      return `${this.numer}/${this.denom}`
    },
    add(rational) {
      const a = this.numer
      const b = this.denom
      const c = rational.getNumer()
      const d = rational.getDenom()
      const newNumer = a * d + b * c
      const newDenom = b * d
      return make(newNumer, newDenom)
    },
  }
}

export default make

/*
1. Создать функцию make, которая принимает numer и denom.
2. Внутри функции создать объект (или сразу вернуть его через return).
3. Добавить в объект свойства для хранения чисел.
4. Написать простые методы: геттеры (отдают значения) и сеттеры (меняют значения через this).
5. Написать метод toString().
6. Написать самый сложный метод add(), который считает новую дробь по формуле и вызывает make() заново.
// */

/*
const rat1 = make()
rat1.setNumer(3)
rat1.setDenom(8)
rat1.getNumer() // 3
rat1.getDenom() // 8

const rat2 = make(10, 3)

// Формула сложения: a / b + c / d = (a * d + b * c) / (b * d)
const rat3 = rat1.add(rat2)
rat3.toString() // '89/24'
// */

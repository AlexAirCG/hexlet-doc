//* // СТАТИЧЕСКИЕ СВОЙСТВА И МЕТОДЫ
export default class Time {
  constructor(hours, minuts) {
    this.hours = hours
    this.minuts = minuts
  }

  static fromString(string) {
    const [hours, minuts] = string.split(':')
    return new Time(hours, minuts)
  }

  toString() {
    return `${this.hours}:${this.minuts}`
  }
}
// */

//* // example
const time = new Time(10, 15)
console.log(`The time is ${time.toString()}`) // => 'The time is 10:15'

const time2 = Time.fromString('10:23')
// автоматически вызывается метод toString()
console.log(`The time is ${time2}`) // 'The time is 10:23'
// */

/* // description
Класс Time, предназначен для создания объекта времени. Его конструктор принимает на вход количество часов и минут в виде двух отдельных параметров.
Добавьте в класс Time статический метод fromString(), который позволяет создавать объекты Time на основе времени переданного строкой формата часы:минуты.
// */

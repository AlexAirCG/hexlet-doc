//* //  ПРОТОТИПЫ

// */

/* // example
const money1 = new Money(100)

console.log(money1.getValue())
console.log(money1.getCurrency())
console.log(money1.exchangeTo('eur').getValue()) // 70

const money2 = new Money(200, 'eur')
console.log(money2.getValue()) // 200
const money3 = money2.add(money1)
console.log(money3.getValue()) // 270

const money4 = money3.add(money1)
console.log(money4.getValue()) // 340

console.log(money1.format()) // "$100.00"
console.log(money2.format()) // "€200.00"

const money5 = new Money(10000)
console.log(money5.format()) // "$10,000.00"
// */

/* // // description
Money.js
Реализуйте и экспортируйте по умолчанию абстракцию "Деньги". Она знает о валюте денег, позволяет их конвертировать в другие валюты, выполнять арифметические операции и форматировать вывод. Список методов:

- Money(value, currency = 'usd') – создает объект деньги.
- Money.prototype.getValue() – возвращает стоимость в виде числа
- Money.prototype.getCurrency() – возвращает валюту денег
- Money.prototype.exchangeTo(currency) – возвращает новый объект деньги, где значение конвертировано в указанную валюту
- Money.prototype.add(money) – возвращает новый объект деньги, который представляет собой сумму исходных и переданных денег, в валюте исходных денег (внутри возможна конвертация если валюты не совпадают)
- Money.prototype.format() – возвращает локализованное представление денег удобное для вывода

Наша реализация поддерживает только две валюты: usd и eur без возможности расширения. Коэффициенты конверсии:

usd -> eur = 0.7
eur -> usd = 1.2
Подсказки
Number.prototype.toLocaleString() – умеет форматировать вывод денег в нужной локали. Если передать undefined первым параметром, то установится текущая локаль. Пример работы метода с локалью "en-US":
(4000).toLocaleString(undefined, { style: 'currency', currency: 'gbp' });
// => £4,000.00

// */

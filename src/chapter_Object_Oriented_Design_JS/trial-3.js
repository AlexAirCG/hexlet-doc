//* // ОБЪЕКТЫ-СУЩНОСТИ, ОБЪЕКТЫ-ЗНАЧЕНИЯ И ВНЕДРЕННЫЕ ОБЪЕКТЫ

// */

/* // example
const url = new Url('http://yandex.ru:80?key=value&key2=value2')
console.log(url.getScheme()) // 'http'
console.log(url.getHostName()) // 'yandex.ru'
console.log(url.getQueryParams())
// {
//   key: 'value',
//   key2: 'value2',
// };
console.log(url.getQueryParam('key')) // 'value'
// второй параметр - значение по умолчанию
console.log(url.getQueryParam('key2', 'lala')) // 'value2'
console.log(url.getQueryParam('new', 'ehu')) // 'ehu'
console.log(url.getQueryParam('new')) // null
console.log(url.equals(new Url('http://yandex.ru:80?key=value&key2=value2'))) // true
console.log(url.equals(new Url('http://yandex.ru:80?key=value'))) // false
// */

/* // description
Реализуйте и экспортируйте по умолчанию класс для работы с HTTP-адресом. Класс должен содержать конструктор и методы:

- конструктор — принимает на вход HTTP-адрес в виде строки
- getScheme() — возвращает протокол передачи данных (без двоеточия)
- getHostName() — возвращает имя хоста
- getQueryParams() — возвращает параметры запроса в виде пар ключ-значение объекта
- getQueryParam() — получает значение параметра запроса по имени. Если параметр с переданным именем не существует, метод возвращает значение заданное вторым параметром (по умолчанию равно null)
- equals(url) — принимает объект класса Url и возвращает результат сравнения с текущим объектом — true или false

Подсказки
- В процессе прохождения испытания нужно будет хорошо поработать с документацией и изучить возможности стандартного класса URL. Это поможет использовать его для парсинга адреса на нужные составляющие.
- Не используйте в решении устаревшие возможности, помеченные как deprecated (parse, format и другие).
- Для работы с query string изучите методы класса URLSearchParams.
- Для преобразования списка пар ключ-значение в объект можно использовать метод Object.fromEntries()
- Что означает двойной знак вопроса "??" в выражении?
// */

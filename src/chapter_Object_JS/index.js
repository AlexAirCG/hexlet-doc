// ГЛАВА: JS Объекты ========================================================
// Теория: О курсе ===========================
/*
// Синтаксис разбирается в следующем уроке
const user = {
  email: 'inna@example.com',
  name: 'Inna',
  password: 'qwerty',
}
*/
// Содержимое файла package.json тоже можно представить в виде объекта JavaScript. Более того, название формата JSON расшифровывается как JavaScript Object Notation:
/*
// json это представление объекта в виде текста
const data = {
  name: 'MyProjectName',
  description: 'My Projects\'s Description',
  dependencies: [
    // тут зависимости
  ],
  // тут остальные свойства
}
*/
/*
// И, наконец, в это сложно поверить, но функции и массивы в JavaScript тоже являются объектами.
console.log(typeof []); // object
// С функцией чуть сложнее
// Проверяем, является ли функция объектом
console.log(Math.random instanceof Object); // true
*/

// Теория: Синтаксис ======================
/*
const user = { name: 'Vasya', married: true, age: 25 }
const rectangle = { width: 10, height: 5 }
*/
// Пары «ключ: значение» в объектах называются свойствами (property).
// Если свойств много, то определение можно растянуть на несколько строк:
/*
const user = {
  name: 'Vasya',
  married: true,
  age: 25,
}
*/
// Для обращения к свойствам объектов используется точечный синтаксис:
/*
user.name // 'Vasya'
rectangle.width // 10
*/
// Иногда по ошибке или намеренно обращаются к свойствам, которых в объекте нет. В этом случае JavaScript возвращает undefined, и продолжает работать как ни в чем не бывало. Такое поведение может приводить к трудноотловимым ошибкам, поэтому будьте осторожны и всегда проверяйте написание свойств, если возвращаются не те данные, или данных нет:
/*
user.nme // undefined
user.name // 'Vasya'
*/
// JavaScript поддерживает альтернативный способ обращения к свойствам объектов – через квадратные скобки — как в массивах:
/*
// имена свойств хранятся внутри объекта в виде строк.
user['name'] // 'Vasya'
rectangle['width'] // 10
user['company'] // undefined
*/
// Зачем нужен такой способ доступа? В реальном использовании объектов часто встречаются алгоритмы, когда имя свойства может меняться в процессе обработки. Обращение к свойству через точку не позволяет задавать имя динамически, а способ через скобки — позволяет:
/*
const user = { name: 'Vasya', married: true, age: 25 }

let propertyName = 'name'
user[propertyName] // 'Vasya'

propertyName = 'married'
user[propertyName] // true
*/
/*
// exercise ---------------------------
Реализуйте и экспортируйте по умолчанию функцию, которая возвращает объект.
У объекта должно быть только два свойства со следующими ключами и значениями:

 Ключ Значение
 file 'src/objects.js'
config true
Всё, что вам нужно сделать, это:

определить функцию
создать нужный объект в функции
вернуть полученный объект из функции

/*
// my
const funcObject = () => {
  const fileObject = { file: "src/objects.js", config: true };

  return fileObject;
};
*/

// Теория: Модификация ===========================
// Для создания и обновления значений свойств в объекте используется одна и та же операция — присваивание. Для несуществующих свойств она запишет новый элемент, для существующих — перезапишет новым значением:
/*
const user = { name: "Vasya", married: true, age: 25 };

user.married = false;
// Изменение существующего свойства
// То же самое
// user['married'] = false;

user.surname = "Petrov";
// Добавление нового свойства
// То же самое
// user['surname'] = 'Petrov';

console.log(user);
// => { name: 'Vasya', married: false, age: 25, surname: 'Petrov' }
*/
// Несмотря на то, что объект объявлен как константа, он меняется. Причина такого поведения точно такая же, как и в случае массивов. В константе хранится не сам объект, а ссылка на него. Это значит, что менять объект можно, но заменить объект на другой нельзя:
/*
const user = { name: 'Maria' }
user.name = 'Igor'

// Возникнет ошибка
user = { name: 'Mike' } // Boom!
*/
// Изменяемость объектов позволяет наполнять их постепенно. То есть мы можем создать пустой объект и затем расширить его нужными свойствами:
/*
const course = {};

course.name = "Хекслет — JS: Объекты";
course.description = "Самый классный курс на свете, не проходите мимо, дети!";

console.log(course.name); // 'Хекслет — JS: Объекты'
console.log(course);
// {
//   name: 'Хекслет — JS: Объекты',
//   description: 'Самый классный курс на свете, не проходите мимо, дети!'
// }
*/
// Удалить элемент из объекта можно с помощью оператора delete:
/*
const user = { name: 'Vasya', wrongProp: 'bug' }
delete user.wrongProp
console.log(user)
// => { name: 'Vasya' }
*/
// Несмотря на наличие удаления, удалять свойства из объекта плохая практика. Как вы увидите далее, любую задачу можно решить без удаления и главное, что такой код будет лучше.

// exercise -------------------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая "нормализует" данные переданного урока. То есть приводит их к определенному виду. Нормализация происходит путём изменения исходного объекта.

На вход этой функции подается объект, описывающий собой урок курса. В уроке содержатся два поля: имя и описание.

const lesson = {
  name: 'Деструктуризация',
  description: 'как удивить друзей',
};
У некоторых уроков имя и описание могут быть в разном регистре. Такое случается при вводе данных:

const lesson = {
  name: 'ДеструКТУРИЗАЦИЯ',
  description: 'каК удивитЬ друзей',
};
Наша функция должна обновлять содержимое урока по следующим правилам:

Имя капитализируется. То есть первый символ имени становится заглавным, остальные маленькими.
Весь текст описания приводится к нижнему регистру.
import normalize from './normalize.js';

const lesson = {
  name: 'ДеструКТУРИЗАЦИЯ',
  description: 'каК удивитЬ друзей',
};

// Обратите внимание, что не используется возврат.
// Объекты, как и массивы, передаются по ссылке.
// Изменение переданного объекта внутри отражается на самом объекте:
normalize(lesson);

console.log(lesson);
// {
//   name: 'Деструктуризация',
//   description: 'как удивить друзей'
// }
Подсказки
capitalize
toLowerCase
*/
/*
// my
import _ from "lodash";

const lesson = {
  name: "ДеструКТУРИЗАЦИЯ",
  description: "каК удивитЬ друзей",
};

const normalize = (obj) => {
  obj.name = _.capitalize(obj.name);
  obj.description = obj.description.toLowerCase();
  return obj;
};

console.log(normalize(lesson));
*/
/*
// teacher
import _ from 'lodash'

export default (lesson) => {
  lesson.name = _.capitalize(lesson.name)
  lesson.description = lesson.description.toLowerCase()
}
*/

// Теория: Ссылки =======================
/*
const company = {};
// Поменять объект можно
company.name = "Hexlet";
// Заменить ссылку нельзя
company = {}; // Ошибка!
let object = {};
// А так можно
object = {};
*/
// Ссылочная природа влияет и на сравнение. Объекты равны между собой не тогда, когда у них одинаковая структура, а когда это один и тот же объект:
/*
const company = { name: "Hexlet" };
company === { name: "Hexlet" }; // false
const copyOfCompany = company; // передается ссылка
// Это одно и то же
copyOfCompany === company; // true
// Меняя одно, меняем и другое
company.createdAt = 2012;
company.superName = "AlexAir";
console.log(copyOfCompany, company); // { name: 'Hexlet', createdAt: 2012 }
*/
// Каждое объявление объекта (в том числе пустого), создает новый объект. Поэтому даже два пустых объекта никогда не равны друг другу:
/*
{} === {}; // false
*/
// Больше всего ссылочная природа объектов влияет на их работу с функциями. Любой объект, передаваемый в функцию, попадает туда по ссылке. Изменение такого объекта внутри функции меняет его и снаружи:
/*
const changeObj = (o) => {
  o.key = "value";
  o.name = "AlexAir";
};
const obj = {};
changeObj(obj);
console.log(obj); // { key: 'value' };
*/
/*
// exercise -------------
Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает объекты по совпадению данных, а не по ссылкам. Эта функция принимает на вход две компании и возвращает true, если их структура одинаковая, и false в обратном случае. Проверка должна проходить по свойствам name, state, website.

import is from './company.js';

const company1 = { name: 'Hexlet', state: 'moderating', website: 'https://hexlet.io' };
const company2 = { name: 'CodeBasics', state: 'published', website: 'https://code-basics.com' };
is(company1, company2); // false

const company1 = { name: 'Hexlet', state: 'published', website: 'https://hexlet.io' };
const company2 = { name: 'Hexlet', state: 'published', website: 'https://hexlet.io' };
is(company1, company2); // true
*/
/*
// my
const company1 = {
  name: "Hexlet",
  state: "published",
  website: "https://hexlet.io",
};
const company2 = {
  name: "CodeBasics",
  state: "published",
  website: "https://code-basics.com",
};

const company3 = {
  name: "Hexlet",
  state: "published",
  website: "https://hexlet.io",
};

const is = (obj1, obj2) => {
  if (
    obj1.name === obj2.name &&
    obj1.state === obj2.state &&
    obj1.website === obj2.website
  ) {
    return true;
  } else {
    return false;
  }
};

console.log(is(company1, company3));
*/
/*
// teacher
const is = (company1, company2) => {
  const keys = ["name", "state", "webstate"];
  for (let key of keys) {
    if (company1[key] !== company2[key]) return false;
  }
  return true;
};
console.log(is(company1, company3));
*/

// Теория: Объекты в действии =============================
// Рассмотрим пример, в котором используется объект. Напишем функцию, которая принимает на вход путь до файла и возвращает информацию об этом файле в виде объекта.
/*
const filepath = '/path/to/index.js'
const fileinfo = getFileInfo(filepath)
// {
//     extension: js
//     filename: index.js
// };
*/
// В Node.js встроен модуль path, который может быстро извлечь нужные данные. Именно им и нужно пользоваться при написании реального кода, здесь же мы фокусируемся не на способе получения данных, а на формировании объекта.
// Для начала нам нужно извлечь имя файла. Это можно сделать, используя метод split().
// import _ from "lodash";
/*
// Разделяем путь на промежуточные директории и файл
const parts = filepath.split("/");
// Извлекаем имя файла
// last извлекает последний элемент из массива
const filename = _.last(parts);
// Затем, точно таким же способом, можно получить и расширение:
const extension = _.last(filename.split("."));
*/
/*
// Теперь, объединяя все вместе, реализуем нужную функцию:
const filepath = "/path/to/index.js";
const getFileInfo = (filepath) => {
  const parts = filepath.split("/");
  const filename = _.last(parts);
  const extension = _.last(filename.split("."));
  // В значения вместо переменных подставятся нужные значения
  const info = { filename: filename, extension: extension };
  return info;
};
console.log(getFileInfo(filepath));
*/
/*
// В примере выше объект создается сразу, когда все данные уже готовы. Иногда делают по-другому, инициализируют объект в самом начале и постепенно наполняют его данными:
const filepath = "/path/to/index.tsx";
const getFileInfo = (filepath) => {
  // Инициализация объекта
  const info = {};
  const parts = filepath.split("/");
  const filename = _.last(parts);
  info.filename = filename;
  const extension = _.last(filename.split("."));
  info.extension = extension;
  return info;
};
console.log(getFileInfo(filepath));
*/
// Какой способ предпочесть? В подавляющем большинстве ситуаций первый способ лучше. Когда объект создается сразу со всеми данными, то его структура очевидна с первого взгляда. Во втором примере придется пробежаться глазами по всему коду чтобы понять что же получится в итоге. С другой стороны, второй способ нужен в ситуациях, когда объект заполняется по условиям, которые могут не выполняться:
/*
// Добавляем свойство в объект только если расширение существует
if (extension) {
  info.extension = extension
}
*/
// Упрощенный синтаксис создания объектов -------------------------------
// Когда объект создается сразу наполненным данными, то он часто выглядит так, как в примерах выше:
/*
const info = { filename: filename, extension: extension }
*/
// Обратите внимание на совпадение имени свойства и имени константы, которая содержит значение для данного свойства. Это настолько распространенный способ создания объектов, что в JavaScript добавили специальный, упрощенный синтаксис создания объектов. Если имя константы соответствует имени свойства в объекте, то можно просто добавить имя константы в определение объекта без указания имени свойства:
/*
const info = { filename, extension }
*/
// Как показывает жизнь, этот подход оказался очень удобным и практичным. К тому же он сочетается с обычным способом создать объект. JavaScript позволяет миксовать разные способы определения в рамках одного объекта:
/*
const filename = "hexlet";
const ext = "jpg";
const info = { filename, extension: ext };
// Порядок не важен, можно было и так
const info = { extension: ext, filename };
// В результате получится
// const info = { filename: 'hexlet', extension: 'jpg' };
*/
/*
// exercise --------------------
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход имя сайта и возвращает информацию о нем:
import getDomainInfo from './domain.js';

// Если домен передан без указания протокола,
// то по умолчанию берется http
getDomainInfo('yandex.ru')
// {
//   scheme: 'http',
//   name: 'yandex.ru',
// }

getDomainInfo('https://hexlet.io');
// {
//   scheme: 'https',
//   name: 'hexlet.io',
// }

getDomainInfo('http://google.com');
// {
//   scheme: 'http',
//   name: 'google.com',
// }
Подсказки
startsWith
replace
Совершенный код: нормализация данных
*/
/*
// my
const getDomainInfo = (filepath) => {
  const info = {};
  if (filepath.startsWith("https://")) {
    info.scheme = "https";
    info.name = filepath.replace("https://", "");
  } else if (filepath.startsWith("http://")) {
    info.scheme = "http";
    info.name = filepath.replace("http://", "");
  } else {
    info.scheme = "http";
    info.name = filepath;
  }
  return info;
};
console.log(getDomainInfo("google.com"));
*/
/*
// teacher
const getDomainInfo = (domain) => {
  let scheme = "";
  if (domain.startsWith("https://")) {
    scheme = "https";
  } else {
    scheme = "http";
  }
  const name = domain.replace(`${scheme}://`, "");
  return { scheme, name };
};
console.log(getDomainInfo("hexlet.io"));
*/

// Теория: Проверка существования свойства ==============================
// В работе с объектами иногда бывает нужно проверить наличие свойства и выполнить особую логику в случае его отсутствия. Проще всего такая проверка выполняется через сравнение с undefined, но этот подход не универсальный. При определенных условиях он сработает неверно.
/*
if (obj.key === undefined) {
  // логика
}
*/
// Представьте себе функцию, которая должна посчитать количество повторяющихся элементов в массиве:
/*
// Вход
const fruits = [
  "apple",
  "banana",
  "pear",
  "apricot",
  "apple",
  "banana",
  "apple",
  "orange",
  "pear",
];
// Выход
// */
/*
const result = {
  apple: 3,
  banana: 2,
  pear: 2,
  orange: 1,
  apricot: 1,
}
*/
// Алгоритм ее работы достаточно прост, но есть один тонкий момент. Во время обхода массива эта функция берет объект-результат, извлекает из него нужное свойство и увеличивает значение на единицу. Но это в случае, когда свойство уже есть. А если его нет? Так как изначально объект-результат пустой, то когда элемент массива появляется первый раз, в объекте нужно создавать соответствующее свойство со значением 1. Посмотрите на реализацию:
/*
const countFruits = (fruits) => {
  const result = {};
  for (const name of fruits) {
    // Проверка на существование
    if (result[name] === undefined) {
      result[name] = 1;
    } else {
      result[name] += 1;
    }
  }
  return result;
};
console.log(countFruits(fruits));
*/
// В подобной ситуации сравнение значения с undefined сработает всегда, но только потому, что undefined не может оказаться внутри существующего свойства. Но бывает и по-другому. Посмотрите на код:
/*
const obj = {
  key: doSomething(),
}
*/
// В примере выше значением key станет результат вызова функции doSomething(). Если эта функция может вернуть undefined, то окажется, что в объекте ключ key определен, но его значение undefined.
// В JavaScript есть более надежный и более правильный по смыслу способ проверить существование свойства, не сравнивая значения – это метод Object.hasOwn(). Вот как меняется функция countFruits(), если использовать этот метод:
/*
const countFruits = (fruits) => {
  const result = {};
  for (const name of fruits) {
    // Проверка на существование
    if (Object.hasOwn(result, name)) {
      result[name] += 1;
    } else {
      result[name] = 1;
    }
  }
  return result;
};
*/
/*
// useing Null coalescing operator
const countFruits = (fruits) => {
  const result = {};
  for (const name of fruits) {
    result[name] = (result[name] ?? 0) + 1;
  }
  return result;
};
console.log(countFruits(fruits));
// */

// Оператор нулевого слияния ---------------------
// Конкретно в нашем примере с поиском фруктов внутри результирующего объекта не может оказаться undefined просто так в качестве значения. Там всегда будет какое-то число, начиная от единицы. Более того, даже проверка на наличие значения лишняя. Всё, что нам нужно – извлекать текущее значение с возможностью задать значение по умолчанию. Сделать это можно, воспользовавшись оператором нулевого слияния. Он позволяет задать значение по умолчанию в случае, когда оно равно null или undefined.
/*
let value
value ?? 'wow' // 'wow'
value = null
value ?? 'wow' // 'wow'
value = true
value ?? 'wow' // true
*/
/*
for (const name of fruits) {
  result[name] = (result[name] ?? 0) + 1
}
*/

// exercise -----------------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая считает количество слов в предложении, и возвращает объект. В объекте свойства — это слова (приведенные к нижнему регистру), а значения — это то, сколько раз слово встретилось в предложении. Слова в предложении могут находиться в разных регистрах. Перед подсчетом их нужно приводить в нижний регистр, чтобы не пропускались дубли.

import countWords from './words.js';

// Если предложение пустое, то возвращается пустой объект
countWords('');
// {}

const text1 = 'one two three two ONE one wow';
countWords(text1);
// {
//   one: 3,
//   two: 2,
//   three: 1,
//   wow: 1,
// }

const text2 = 'another one sentence with strange Words words';
countWords(text2);
// {
//   another: 1,
//   one: 1,
//   sentence: 1,
//   with: 1,
//   strange: 1,
//   words: 2,
// }
Подсказки
Для формирования массива слов поможет функция _.words
toLowerCase – приведение к нижнему регистру
*/
/*
// my
import _ from "lodash";
const text2 = "another one sentence with strange Words words";
const countWords = (str) => {
  const result = {};
  const strAsArr = _.words(str.toLowerCase());
  for (let item of strAsArr) {
    result[item] = (result[item] ?? 0) + 1;
  }
  return result;
};
console.log(countWords(text2));
*/
/*
// teacher
export default (sentence) => {
  const words = _.words(sentence)
  const result = {}
  for (const word of words) {
    const lowerWord = word.toLowerCase()
    result[lowerWord] = (result[lowerWord] ?? 0) + 1
  }
  return result
}
*/

// Теория: Обход свойств объекта ===========================
// Объект в JavaScript, в отличие от массива, не является коллекцией. Его нельзя обходить как обычный массив с помощью цикла for..of, хотя подобная задача иногда возникает. Например, когда мы хотим распечатать все свойства на экран, или когда свойства в объект добавляются динамически — то есть их имена могут меняться в процессе жизни объекта.
// В JavaScript для обхода объектов есть несколько способов. Самый простой — использовать конструкцию for..in, которая очень похожа на обычный цикл.
/*
const course = { name: "JS: React", slug: "js-react" };
for (const prop in course) {
  console.log(`course.${prop} = ${course[prop]}`);
}
// course.name = JS: React
// course.slug = js-react
// */
// Несмотря на простоту использования, for..in работает не совсем так, как может показаться. for..in выводит не только свойства самого объекта, но и свойства, добавленные в прототип этого объекта. Эту тему мы пока не проходили и дается она позже, но если в двух словах, то объекты в JavaScript могут быть связаны друг с другом и обращение к свойству в одном объекте может приводить к обращению (неявному) к свойству в другом объекте (прототипе). Мы уже сталкивались с таким поведением на практике, но пока обходили этот вопрос стороной.
// Главное, что сейчас нужно понимать, в подавляющем большинстве случаев это нежелательное поведение. Именно поэтому for..in используется не так часто, как может показаться. Гораздо более распространенный способ — обходить ключи. Метод Object.keys(obj) позволяет получить массив всех ключей объекта:
/*
const course = { name: "JS: React", slug: "js-react" };
const keys = Object.keys(course); // [ 'name', 'slug' ]
// */
// Далее мы можем обойти в цикле массив ключей и получить нужные значения. На практике, обычно, сначала получают массив ключей и что-то с ним делают. Например, фильтруют, отбирая только нужные ключи, а затем обрабатывают исходный объект или создают новый, получая в цикле значение по ключу.
/*
for (const key of keys) {
  console.log(course[key]);
}
// */
// Если ключи в процессе обхода не используются, то можно сразу получить массив значений свойств объекта. Это делает метод Object.values(obj):
/*
const course = { name: "JS: React-hello", slug: "js-react" };
const values = Object.values(course); // [ 'JS: React', 'js-react' ]
for (const value of values) {
  console.log(value);
}
// */
// Ну, и последний вариант, метод, который возвращает сразу ключи и значения объекта. То есть каждый элемент сам будет массивом, содержащим ключ и соответствующее ему значение — [ key, value ]. За это отвечает метод Object.entries(obj):
/*
const course = { name: "JS: React", slug: "js-react" };
const entries = Object.entries(course);
// [[ 'name', 'JS: React' ], [ 'slug', 'js-react' ]]
// Обойти такой массив циклом for...of не составит никакого труда, а деструктуризация позволит сделать это красиво:
for (const [key, value] of entries) {
  console.log(key);
  console.log(value);
}
// */
// Рассмотрим пример. Реализуем функцию findKeys(), которая возвращает список ключей объекта, значение которых равно переданному значению:
/*
const lessonMembers = {
  syntax: 3,
  using: 2,
  foreach: 10,
  operations: 10,
  destructuring: 2,
  array: 2,
};
// Логика работы функции выглядит так:
// 1 Обходим свойства объекта
// 2 Если значение в свойстве совпадает с переданным, то добавляем ключ в результат
const findKeys = (obj, expectedValue) => {
  let result = [];
  const entries = Object.entries(obj);
  for (const [key, value] of entries) {
    if (value === expectedValue) {
      result.push(key);
    }
  }
  return result.join(", ");
};
console.log(findKeys(lessonMembers, 10)); // foreach, operations
console.log(findKeys(lessonMembers, 3)); // syntax
// */

// Порядок ключей -------------------
// Одна из ключевых особенностей массива — наличие строгого порядка, в котором следуют элементы. В объектах это не так, порядок какой-то есть, но им нельзя управлять. Этот порядок базируется на внутренних правилах работы JavaScript. Если нам важен порядок, то для этого придется вводить дополнительный массив, в котором будет храниться список ключей в том порядке, в котором мы хотим получить вывод.

// exercise -------------------
/*
Реализуйте и экспортируйте функцию по умолчанию, которая формирует из переданного объекта другой объект, включающий только указанные свойства. Параметры:

Исходный объект
Массив имен свойств
import pick from './objects.js';

const data = {
  user: 'ubuntu',
  cores: 4,
  os: 'linux',
};

pick(data, ['user']); // { user: 'ubuntu' }
pick(data, ['user', 'os']); // { user: 'ubuntu', os: 'linux' }
pick(data, []); // {}
// Если такого свойства нет в исходных данных,
// то оно игнорируется
pick(data, ['none', 'cores']); // { cores: 4 }
Такая функция есть в lodash, но вам необходимо её реализовать самостоятельно.
/*
// my
const data = {
  user: "ubuntu",
  cores: 4,
  os: "linux",
};

const pick = (obj, arr) => {
  let result = {};
  const entriers = Object.entries(obj);
  for (const [key, value] of entriers) {
    for (let i of arr) {
      if (key === i) {
        result[i] = value;
      }
    }
  }
  return result;
};
console.log(pick(data, ["none", "cores"]));
// */
/*
// teacher
const data = {
  user: "ubuntu",
  cores: 4,
  os: "linux",
};
const pick = (data, keys) => {
  const result = {};
  for (const key of keys) {
    if (Object.hasOwn(data, key)) {
      result[key] = data[key];
    }
  }
  return result;
};
console.log(pick(data, ["user", "cores", "os"]));
// */

// Теория: Вложенные объекты ============================
// Значением свойства объекта может быть всё, что угодно, включая другой объект или массив:
/*
const user = { name: "Vasya", married: true, age: 25 };
// Добавим свойство friends со списком друзей
user.friends = ["Kolya", "Petya"];
// Добавим свойство children со списком детей,
// каждый ребёнок представлен отдельным объектом
user.children = [
  { name: "Mila", age: 1 },
  { name: "Petr", age: 10 },
];
// Добавим вложенный объект
user.company = { name: "Hexlet" };
console.log(user); // =>
// {
//   name: 'Vasya',
//   married: true,
//   age: 25,
//   friends: [ 'Kolya', 'Petya' ],
//   children: [ { name: 'Mila', age: 1 }, { name: 'Petr', age: 10 }],
//   company: { name: 'Hexlet' }
// }
// */
// Все то же самое можно определить сразу при создании объекта:
/*
const user = {
  name: "Vasya",
  married: true,
  age: 25,
  friends: ["Kolya", "Petya"],
  children: [
    { name: "Mila", age: 1 },
    { name: "Petr", age: 10 },
  ],
  company: {
    name: "Hexlet",
  },
};
console.log(user);
// */
// В этом случае обращение к вложенным элементам происходит по цепочке:
/*
user.friends[1] // 'Petya'
user.children[0].name // 'Mila'
user.company.name // 'Hexlet'
// Или через квадратные скобки
user['children'][0]['name'] // 'Mila'
// */

// Печать на экран -------------------------
// В console.log() встроено одно ограничение. Если в объекте есть другие объекты на глубине больше второго уровня вложенности, то при выводе такого объекта на экран вместо объектов отобразится строка [Object], а вместо массива — [Array].
/*
const obj = { a: { b: { c: { key: "value" }, e: [1, 2] } } };
console.log(obj);
// { a: { b: { c: [Object], e: [Array] } } }
// Для вывода таких объектов можно воспользоваться функцией преобразования в JSON:
console.log(JSON.stringify(obj));
// Или форматированный вывод
console.log(JSON.stringify(obj, null, "  "));
// */

// Проверки в глубину ---------------------
// При работе с вложенными объектами резко усложняется задача проверки существования ключей. Приходится строить цепочку из условий до нужного свойства. Представьте, что нам нужно добраться до 4 уровня вложенности и мы не уверены в том, что существуют все промежуточные объекты:
/*
// Добираемся до obj.one.two.three
if (Object.hasOwn(obj, 'one')) {
  if (Object.hasOwn(obj.one, 'two')) {
    if (Object.hasOwn(obj.one.two, 'three')) {
      // ...
    }
  }
}
// */
// Так будет выглядеть решение в лоб. Однако, есть более удобный способ, речь о котором ниже.

// Оператор опциональной последовательности --------------------
// Если задача состоит в том, чтобы извлечь данные, а не просто проверить их существование, то можно пойти другим путем. В Javascript встроен оператор опциональной последовательности (optional chaining), который позволяет извлекать вложенные данные без проверок:
/*
const obj = {};
console.log(obj?.one?.two?.three); // undefined
// */
// Этот оператор никогда не приводит к ошибке. Он работает на любых типах данных и всегда возвращает либо undefined, либо значение указанного свойства, если оно существует.
// Оператор не меняет общий подход работы с ключами в объектах. Этот же пример с динамическим ключом:
/*
const obj = {}
const key = 'one'
obj?.[key]?.two?.three // undefined
// */

// Оператор нулевого слияния ----------------
// С помощью оператора нулевого слияния, можно не только получить значение цепочки любой вложенности, но и определить значение по умолчанию для него.
/*
const obj = {};
console.log(obj?.one?.two?.three ?? "defaultValue"); // 'defaultValue'
// */
// Значение по умолчанию возвращается только в том случае, когда слева undefined или null. В этом смысле данный оператор совсем не похож на логическое сравнение ||:
/*
const value = false;
console.log(value ?? "default"); // false
console.log(value || "default"); // 'default'
// */

// get (lodash) ---------------
// Пример выше перегружен символами и выглядит достаточно сложно. Как альтернативу можно использовать функцию get() библиотеки Lodash.
/*
import _ from "lodash";
const obj = {};
const value = _.get(obj, "one.two.three", "defaultValue"); // 'defaultValue'
console.log(value);
// */
// get() особенно удобен в случае динамических ключей. В таком случае вторым аргументом можно передать массив ключей:
/*
_.get(obj, ['one', 'two', 'three'], 'defaultValue') // 'defaultValue'
// */

// exercise ----------------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая извлекает из объекта любой глубины вложенности значение по указанным ключам. Параметры:

Исходный объект
Цепочка ключей (массив), по которой ведётся поиск значения
В случае, когда добраться до значения невозможно, возвращается null.

import get from './objects.js';

const data = {
  user: 'ubuntu',
  hosts: {
    0: {
      name: 'web1',
    },
    1: {
      name: 'web2',
      null: 3,
      active: false,
    },
  },
};

get(data, ['undefined']); // null
get(data, ['user']); // 'ubuntu'
get(data, ['user', 'ubuntu']); // null
get(data, ['hosts', 1, 'name']); // 'web2'
get(data, ['hosts', 0]); // { name: 'web1' }
get(data, ['hosts', 1, null]); // 3
get(data, ['hosts', 1, 'active']); // false
get(data, []); // { user: 'ubuntu', hosts: { 0: { name: 'web1' }, 1: { name: 'web2', null: 3, active: false }}}
В этой задаче нельзя использовать библиотеку lodash. Смысл задачи в том, чтобы реализовать всё самостоятельно.

Для проверки наличия ключа используйте вариант предлагаемый ниже:

// Метод Object.hasOwn() проверяет есть ли в объекте ключ,
// просто скопируйте этот вызов и подставьте правильные аргументы

const obj = { key: 'value' };
Object.hasOwn(obj, 'key'); // true
Object.hasOwn(obj, 'another key'); // false
// */
/*
// my
const data = {
  user: "ubuntu",
  hosts: {
    0: {
      name: "web1",
    },
    1: {
      name: "web2",
      null: 3,
      active: false,
    },
  },
};
const get = (obj, arr) => {
  for (let key of arr) {
    if (Object.hasOwn(obj, key)) {
      obj = obj[key];
    } else {
      return null;
    }
  }
  return obj;
};
console.log(get(data, ["userrr"]));
// */
/*
const data = {
  user: "ubuntu",
  hosts: {
    0: {
      name: "web1",
    },
    1: {
      name: "web2",
      null: 3,
      active: false,
    },
  },
};
const get = (data, keys) => {
  let current = data;
  for (const key of keys) {
    const hasProperty = Object.hasOwn(current, key);
    if (!hasProperty) return null;
    current = current[key];
  }
  return current;
};
console.log(get(data, ["hosts", 1, null]));
// */

// Теория: Слияние =============================
// Слияние (merge) — операция над объектами, выполняющая их объединение. Она появляется там, где необходимо данные одного объекта перенести в другой объект.
// Слияние часто используется при работе с веб-формами. Например, когда пользователь меняет свои персональные данные в настройках аккаунта, измененные данные приходят в приложение в виде объекта. Данные из этого объекта нужно перенести в объект пользователя. Так происходит обновление пользователя:
/*
// Такой пользователь есть в системе
const user = { name: "Tirion", email: "support@hexlet.io", age: 44 };
// Из формы пришли данные
const data = { name: "Tirion 2", age: 33 };
// В результате должно получиться
// { name: 'Tirion 2', email: 'support@hexlet.io', age: 33 };
// */
// Решение в лоб — перенести каждое свойство отдельно:
/*
user.name = data.name
user.age = data.age
// Где-то тут сохраняем пользователя в базе данных
// */
// Прямой перенос хорошо работает, когда данных мало и их структура не меняется. Если же данных много или в разные моменты времени могут приходить разные данные, то это превращается в кучу одинакового кода:
/*
if (Object.hasOwn(data, 'name')) {
  user.name = data.name
}
// И так нужно перечислить все возможные свойства
// */
// С помощью слияния (часто говорят «мержа») мы можем сократить все до одной строчки:
/*
const user = { name: "Tirion", email: "support@hexlet.io", age: 44 };
const data = { name: "Tirion 2", age: 33 };
Object.assign(user, data);
console.log(user);
// => { name: 'Tirion 2', email: 'support@hexlet.io', age: 33 };
// */
// Метод Object.assign() берёт объект, переданный первым параметром, и переносит в него всё из объектов, переданных остальными параметрами. В нашей ситуации это один объект, переданный вторым параметром.
// Слияние работает так. Если какое-то свойство было только в первом объекте, то оно остается тем, что и было. Если свойство присутствует во втором (и далее) объекте, то оно записывается в первый независимо от того, было оно там или нет. Поэтому, если свойство присутствовало и в первом объекте и во втором, то оно будет перезаписано значением из второго объекта:
/*
const obj1 = { a: "a", b: "b" };
const obj2 = { c: "c", b: "v" };
Object.assign(obj1, obj2);
console.log(obj1);
// => { a: 'a', b: 'v', c: 'c' }
// */
// У метода Object.assign() есть одно ограничение: он выполняет только поверхностное слияние. Вложенные объекты не сравниваются, а просто заменяются:
/*
const obj1 = { a: { a: 1 } };
const obj2 = { a: { b: 1 } };
Object.assign(obj1, obj2);
console.log(obj1);
// => { a: { b: 1 } }
// пример глубокого (рекурсивного) слияния
// используется метод merge() библиотеки lodash
import _ from "lodash";
_.merge(obj1, obj2);
console.log(obj1);
// => { a: { a: 1, b: 1 } }
// */
// Как и любой другой мощный механизм, слияние нуждается в аккуратном использовании. В объектах бывают поля, которые не должны быть перезаписаны при слиянии, например, количество денег на счету у пользователя. Если не контролировать состав данных из второго объекта, то туда могут попасть свойства (случайно или злонамеренно), которые приведут к перезаписыванию важных свойств.
// Если говорить про веб-формы, то технически всегда можно послать больше данных, чем описано в форме.

/*
// exercise -----------------
Реализуйте и экспортируйте по умолчанию функцию, которая заполняет объект данными из другого объекта по разрешенному списку ключей. Параметры:

Исходный объект
Список ключей, которые нужно заменить
Данные, которые нужно сливать в исходный объект
В случае, когда список ключей пустой, нужно сливать все данные полностью.

import fill from '../objects.js';

const company = {
  name: null,
  state: 'moderating',
};

const data = {
  name: 'Hexlet',
  state: 'published',
};

// Вызовы ниже нужно рассматривать как независимые

fill(company, ['name'], data);
// {
//   name: 'Hexlet',
//   state: 'moderating',
// }

fill(company, [], data);
// {
//   name: 'Hexlet',
//   state: 'published',
// }
Попробуйте решить эту задачу с помощью слияния.

Подсказки
_.pick()
// */
/*
// my
import _ from "lodash";
const company = {
  name: null,
  state: "moderating",
};
const data = {
  name: "Hexlet",
  state: "published",
};
const fill = (obj, keys, data) => {
  const filterData = keys.length > 0 ? _.pick(data, keys) : data;
  return Object.assign(obj, filterData);
};
console.log(fill(company, [], data));
// {
//   name: 'Hexlet',
//   state: 'published',
// }
// */
// teacher the same

// Теория: Клонирование и копирование ===========================
// Клонирование объектов — еще одна часто встречающаяся операция в разработке, особенно во фронтенде. При клонировании создается копия исходного объекта — то есть новый объект, наполненный теми же данными.
// В JavaScript клонирование можно эмулировать с помощью Object.assign(). Для этого нужно первым параметром передать пустой объект, а вторым — тот, который нужно клонировать:
/*
const user = { name: "Tirion", email: "support@hexlet.io", age: 44 };
// Данные из user копируются во вновь созданный объект
const copyOfUser = Object.assign({}, user);
user === copyOfUser; // false
console.log(copyOfUser);
// */
// В результате получаются два разных объекта с одним и тем же содержимым. Объекты разные, поэтому изменения в одном не меняют данные в другом.
// Клонирование также выполняют с помощью функции clone() библиотеки lodash. Результат выполнения этой функции идентичен примерам выше, но благодаря своему имени, она лучше выражает смысл операции:
/*
import _ from "lodash";
const user = { name: "Tirion", email: "support@hexlet.io", age: 44 };
const copyOfUser = _.clone(user);
copyOfUser.name = "Lord Tirion";
console.log(copyOfUser);
console.log(user);
// */
// Клонирование способами выше не затрагивает вложенные объекты. Они оказываются в новом объекте по ссылке из старого:
/*
const user = { company: { name: "Hexlet" } };
const copyOfUser = Object.assign({}, user);
// Это тот же объект
user.company === copyOfUser.company; // true
user.company.createdAt = 2012;
console.log(user);
console.log(copyOfUser.company.createdAt); // 2012
// */
// Такое клонирование называется поверхностным (shallow copying). Очень важно запомнить, что именно это имеют в виду в JavaScript, когда употребляют термин «клонирование». Поверхностное клонирование подходит для многих ситуаций, но иногда его недостаточно. В таких случаях нужно использовать полное или глубокое клонирование (deep copying).
// В JavaScript есть встроенный метод structuredClone(), c помощью которого можно выполнить глубокое копирование объектов:
/*
const user = { company: { name: 'Hexlet' } }
const copyOfUser = structuredClone(user)
user.company === copyOfUser.company // false
// */
// Библиотека lodash также предоставляет готовую функцию cloneDeep(). Она была распространенным решением проблемы глубокого копирования, пока не появился метод structuredClone().
// У полного клонирования есть один серьезный недостаток. Если мы работаем с большим объектом со сложной структурой, то полное клонирование может сильно влиять на производительность. Это одна из причин, почему такое клонирование не выполняется по умолчанию.

/*
// exercise ------------------
Реализуйте и экспортируйте по умолчанию функцию, которая выполняет поверхностное копирование объектов.

import cloneShallow from '../objects.js';

const data = {
  key: 'value',
  key2: {
    key: 'innerValue',
    innerKey: {
      anotherKey: 'anotherValue',
    },
  },
};

// result имеет такую же структуру, как и data
const result = cloneShallow(data);
Реализуйте этот функционал самостоятельно, не используя функцию Object.assign().

Подсказки
Для решения этой задачи, нужно последовательно обойти исходный объект и скопировать его данные в другой объект.
// */
/*
// my
const data = {
  key: "value",
  key2: {
    key: "innerValue",
    innerKey: {
      anotherKey: "anotherValue",
    },
  },
};
const cloneShallow = (obj) => {
  const result = {};
  for (let key in obj) {
    result[key] = obj[key];
  }
  return result;
};
console.log(cloneShallow(data));
// */
/*
// teacher
const data = {
  key: "value",
  key2: {
    key: "innerValue",
    innerKey: {
      anotherKey: "anotherValue",
    },
  },
};
const cloneShallow = (obj) => {
  const result = {};
  const entrier = Object.entries(obj);
  for (const [key, value] of entrier) {
    result[key] = value;
  }
  return result;
};
console.log(cloneShallow(data));
// */

// Теория: Создание новых объектов и spread =======================
// Поверхностное копирование (clone) и слияние (merge) можно объединить в одну операцию. Это позволяет обновлять объекты в функциональном стиле, другими словами, мы создаем новые объекты на основе старых, вместо их обновления. Подробнее с такими задачами мы познакомимся ближе к концу профессии, когда пойдет речь про фреймворки. Ниже пример такой операции:
/*
const user = { name: 'Tirion', email: 'support@hexlet.io', age: 44 }
const data = { name: 'Tirion 2', age: 33 }
// Новый объект с данными user дополненными данными из data
const copyOfUser = Object.assign({}, user, data)
// */
// В современном JavaScript добавили специальный оператор, который позволяет выполнять ту же задачу немного короче и, главное, нагляднее. Он называется spread оператор (на русском его так и называют «спред-оператор»). Простое поверхностное копирование с помощью спреда:
/*
// Поверхностное копирование
const copyOfUser = { ...user }
// Object.assign({}, user);
// */
// Spread оператор – это три точки перед именем переменной (или константы), внутри определения объекта. Он раскладывает соответствующий объект внутри нового объекта. С его помощью можно получить только копию, он не может изменять существующие объекты.
// С помощью spread оператора легко расширять новые объекты дополнительными данными:
/*
const user = { name: 'Vasya', age: 11 }
const newUser = { ...user, married: true, age: 25 }
// Возраст поменялся
console.log(newUser) // => { name: 'Vasya', married: true, age: 25 }
// */
// Всё, что появляется с правой стороны спреда, будет иметь приоритет при слиянии, аналогично тому как работает Object.assign(). В свою очередь всё что слева — имеет более низкий приоритет:
/*
const user = { name: "Vasya", age: 11 };
const newUser = { age: 25, married: true, ...user };
// Возраст остался тем же
console.log(newUser); // => { name: 'Vasya', married: true, age: 11 }
// */
// Свойства могут одновременно появляться как слева, так и справа от этого оператора:
/*
const user = { name: 'Vasya', age: 11 }
const newUser = { age: 25, ...user, married: true }
// Возраст остался тем же
console.log(newUser) // => { name: 'Vasya', married: true, age: 11 }
// */
// Сам спред оператор может использоваться в рамках одного объекта любое количество раз:
/*
const user = { name: 'Vasya', married: true, age: 25 }
const user2 = { name: 'Irina', surname: 'Petrova' }
const mergedObject = { ...user, ...user2 }
console.log(mergedObject)
// => { name: 'Irina', married: true, age: 25, surname: 'Petrova' }
// В обратном порядке
const mergedObject2 = { ...user2, ...user }
console.log(mergedObject2)
// => { name: 'Vasya', surname: 'Petrova', married: true, age: 25 }
// */
// Наконец, можно объединить и новые свойства и несколько спредов вместе:
/*
const user = { name: 'Irina', age: 25, married: false }
const user2 = { name: 'Petya', surname: 'Ivanov' }
const newUser = { ...user, married: true, ...user2 }
console.log(newUser)
// => { name: 'Petya', age: 25, married: true, surname: 'Ivanov' }
// */
/*
// exercise ------------------
Реализуйте и экспортируйте по умолчанию функцию, которая создает объект компании и возвращает его. Для создания компании обязательно только одно свойство – имя компании. Остальные свойства добавляются только если они есть. Параметры:

Имя (обязательно)
Объект с дополнительными свойствами (если они есть)
Также, кроме имени, у компаний есть два свойства со значениями по умолчанию. Если значение этих свойств не передано при создании, то они принимают следующие значения:

state – moderating
createdAt – текущая дата (в формате Unix-времени. Это число - количество миллисекунд, прошедших с полуночи 1 января 1970 года)
import make from '../company.js';

// Дополнительные свойства не переданы
const company = make('Hexlet');
// {
//   name: 'Hexlet',
//   state: 'moderating',
//   createdAt: <тут текущая дата>
// }

// Передаем дополнительные свойства
const company = make('Hexlet', { website: 'hexlet.io', state: 'published' });
// {
//   name: 'Hexlet',
//   website: 'hexlet.io',
//   state: 'published',
//   createdAt: <тут текущая дата>
// }
Используйте спред-оператор для слияния данных внутри и возврата нового объекта.

Подсказки
Для получения текущей даты в формате Unix-времени используйте метод Date.now()
// */
/*
// my -------------
const make = (name, obj) => {
  const date = Date.now();
  const company = { name: name, state: "moderating", createdAt: date };
  const copyCompany = { ...company, ...obj };
  return copyCompany;
};
console.log(make("Hexlet"));
// */
/*
// teacher ----------
const make = (name, date = {}) => {
  const defaultObj = {
    state: "moderating",
    createdAt: Date.now(),
  };
  return { ...defaultObj, ...date, name };
};
console.log(make("Hexlet"));
// */

// Теория: Деструктуризация ================================
// Объекты в реальных приложениях часто имеют сложную структуру. Объекты, вложенные в объекты, которые вложены в объекты и так далее. Использовать глубоко вложенные объекты напрямую неудобно, если такое использование требует повторных обращений:
/*
const greeting = `${user.company.name} was founded in ${user.company.createdAt}`;
console.log(greeting);
// */
// Разработчики стараются сократить такой код и создают промежуточные константы для вложенных данных:
/*
const company = user.company
const greeting = `${company.name} was founded in ${company.createdAt}`
console.log(greeting)
// */
// Чем больше обращений к вложенным данным, тем полезнее эта техника. Но само извлечение данных может стать громоздким, если этих данных много. Пример из реальной жизни:
/*
const response = {
  data: {
    type: "photos",
    id: "550e8400-e29b-41d4-a716-446655440000",
    attributes: {
      title: "Ember Hamster",
      src: "http://example.com/images/productivity.png",
    },
    relationships: {
      author: {
        links: {
          related: "http://example.com/articles/1/author",
        },
      },
    },
    links: {
      self: "http://example.com/photos/550e8400-e29b-41d4-a716-446655440000",
    },
  },
};
// */
// Это данные вымышленного приложения представленные в виде формата jsonapi. Он, например, используется на Хекслете для взаимодействия серверной и клиентской части сайта. Внутри клиента эти данные извлекаются и выводятся на экран. Представьте себе, как бы мог выглядеть код извлечения внутренностей этой структуры:
/*
const user = response.data.attributes;
const links = response.data.links;
const author = response.data.relationships.author;
// */
// Чем больше данных нужно извлечь и чем они глубже расположены, тем больше однообразного и повторяющегося кода придется написать. В принципе, в этом нет никакого криминала и раньше так жили все. Но с развитием языка появилась возможность сделать код гораздо лучше.
// Деструктуризация (destructuring) — специальный синтаксис, позволяющий извлекать части из составных данных. Это удобный способ раскладывать объекты на части. Он позволяет сократить код и сделать его более понятным.
/*
const person = { firstName: "Rasmus", lastName: "Lerdorf", manager: true };
const { firstName, manager } = person;
console.log(firstName); // => 'Rasmus'
console.log(manager); // => true
// */
// Деструктуризация похожа на создание объекта. Абсолютно тот же самый синтаксис, но теперь не для создания объекта, а для разложения его на части. Деструктуризация позволяет раскладывать объект по частям, то есть не обязательно извлекать все части сразу. В примере выше у объекта три свойства, но извлекаются только два. Порядок описания свойств при извлечении не важен.
// При деструктуризации можно менять имена. Такое бывает нужно, если подобная константа уже определена выше.
/*
const manager = {}; // имя занято
const person = { firstName: "Rasmus", lastName: "Lerdorf", manager: true };
const { manager: isManager } = person;
console.log(isManager); // => true
// */
// В случае отсутствия свойств в объекте, деструктуризация позволяет задавать значения по умолчанию для таких свойств:
/*
const person = { firstName: 'Rasmus', lastName: 'Lerdorf' }
console.log(person.manager) // undefined
const { manager = false } = person
console.log(manager) // => false
// */
// Деструктуризация может быть вложенной. Она позволяет извлекать части объектов на любую глубину. Поэтому наш пример выше можно переписать так:
/*
// const user = response.data.attributes;
// const links = response.data.links;
// const author = response.data.relationships.author;
const {
  links,
  attributes: user,
  relationships: { author },
} = response.data;
console.log(author);
// */
// У spread оператора есть похожий, но выполняющий обратное действие оператор, называемый rest. С его помощью во время деструктуризации можно собрать все оставшиеся свойства в один объект:
/*
const user = { name: 'Tirion', email: 'support@hexlet.io', age: 44 }
const { name, ...rest } = user
console.log(rest)
// => { email: 'support@hexlet.io', age: 44 }
// */
// Деструктуризация хоть и не является обязательным элементом и она не влияет на архитектуру программ, но ее использование делает код чище и понятнее (если не увлекаться глубиной).
/*
// exercise --------------
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список пользователей, извлекает их имена, сортирует в алфавитном порядке и возвращает отсортированный список имен.

const users = [
  { name: 'Bronn', gender: 'male', birthday: '1973-03-23' },
  { name: 'Reigar', gender: 'male', birthday: '1973-11-03' },
  { name: 'Eiegon', gender: 'male', birthday: '1963-11-03' },
  { name: 'Sansa', gender: 'female', birthday: '2012-11-03' },
];

getSortedNames(users); // ['Bronn', 'Eiegon', 'Reigar', 'Sansa']
Попробуйте использовать деструктуризацию для извлечения имени прямо в цикле.
// */
/*
// my ----------------
const users = [
  { name: "Bronn", gender: "male", birthday: "1973-03-23" },
  { name: "Reigar", gender: "male", birthday: "1973-11-03" },
  { name: "Eiegon", gender: "male", birthday: "1963-11-03" },
  { name: "Sansa", gender: "female", birthday: "2012-11-03" },
];
const getSortedNames = (obj) => {
  let result = [];
  for (let item of obj) {
    const { name } = item;
    result.push(name);
  }
  return result.sort();
};
console.log(getSortedNames(users));
// */
/*
// teacher ---------------
const users = [
  { name: "Bronn", gender: "male", birthday: "1973-03-23" },
  { name: "Reigar", gender: "male", birthday: "1973-11-03" },
  { name: "Eiegon", gender: "male", birthday: "1963-11-03" },
  { name: "Sansa", gender: "female", birthday: "2012-11-03" },
];
const getSortedNames = (users) => {
  const result = [];
  for (const { name } of users) {
    result.push(name);
  }
  return result.sort();
};
console.log(getSortedNames(users));
// */

// Теория: Хеш-таблицы =================================
// Ассоциативный массив — абстрактный тип данных, с помощью которого хранятся пары ключ-значение. У него есть и другие названия: «словарь», «мап» (от слова map). В разных языках ему соответствуют разные типы данных. В JavaScript массив можно хранить в объекте (Object), в других языках:
/*
Ruby — Hash
Lua — Table
Python — Dictionary
Elixir/Java — Map
// */
// Для чего он нужен? Ассоциативные массивы крайне популярны в прикладном программировании. С их помощью удобно представлять составные данные, содержащие множество различных параметров. Фактически все предыдущие уроки по объектам в JavaScript были посвящены тому, как использовать объекты в качестве ассоциативных массивов.
// Ассоциативный массив, в отличие от обычного массива (называемого индексированным, так как значения в нем расположены по индексам), нельзя положить в память «как есть». У него нет индексов, которые бы могли определить порядок и простой способ добраться до значений. Для реализации ассоциативных массивов часто используют специальную структуру данных — хеш-таблицу. Она позволяет организовать данные ассоциативного массива удобным для хранения способом. Для этого хеш-таблица использует две вещи: индексированный массив и функцию для хеширования ключей. Обратите внимание, что хеш-таблица это не просто способ размещать данные в памяти, она включает в себя логику.
// Ниже пойдет речь про то, как ассоциативные массивы бывают устроены внутри. Эта информация крайне важна для разработчиков, которые хотят по-настоящему разбираться в том, что они делают. Она снимает «магичность» с происходящего внутри языка и дает понимание цены, которую приходится платить за удобство использования объектов.
// Итак, что примерно происходит, когда мы выполняем код:
/*
const data = {};
data["key"] = "value";
console.log(data);
// */
// Хеширование ----------------------
// Любая операция внутри хеш-таблицы начинается с того, что ключ каким-то образом преобразуется в индекс обычного массива. Для получения индекса из ключа нужно выполнить два действия: найти хеш (хешировать ключ) и привести его к индексу (например, через остаток от деления).
// Хеширование — операция, которая преобразует любые входные данные в строку (реже число) фиксированной длины. Функция, реализующая алгоритм преобразования, называется «хеш-функцией», а результат называют «хешем» или «хеш-суммой». Наиболее известны CRC32, MD5 и SHA (много разновидностей).
/*
// В JavaScript нет встроенной поддержки алгоритма хеширования crc32 (удобен для наглядности)
// Поэтому используется сторонняя библиотека
// В JavaScript нет встроенной поддержки алгоритма хеширования crc32 (удобен для наглядности)
// Поэтому используется сторонняя библиотека
import crc32 from "crc-32";
const data = "Hello, world!"; // Любые данные, которые мы хотим хешировать
const hash = crc32.str(data);
// Хеш всегда одинаковый для одних и тех же данных!
console.log(hash); // => -337197338
// */
// С хешированием мы встречаемся в разработке часто. Например, идентификатор коммита в git 0481e0692e2501192d67d7da506c6e70ba41e913 не что иное, как хеш, полученный в результате хеширования данных коммита.
// После того, как хеш получен, его можно преобразовать в индекс массива, например, через получение остатка от деления:
/*
// Это делается для того, чтобы индексы не были слишком большими
// Чем больше размер массива, тем больше памяти он занимает
const index = Math.abs(hash) % 1000; // по модулю
console.log(index); // => 338
// */
// За кулисами ---------------
// Рассмотрим процесс добавления нового значения в ассоциативный массив (напоминаем, что в JavaScript он представлен типом данных Object). Программист пишет:
/*
const data = {}
data['key'] = 'value'
// */
// Такая простая, на первый взгляд, строчка, запускает целый процесс. Ниже его грубое описание, без деталей и с упрощениями:
/*
// Для простоты показано на JavaScript, хотя в реальности всё это происходит на более низком уровне
// 1. Создание ассоциативного массива приводит к инициализации индексированного массива внутри интерпретатора.
const internal = []
// Во время присвоения значения `data['key'] = 'value'`, интерпретатор выполняет несколько действий:
// 2. Хеширует ключ. Результатом хеширования становится число.
const hash = crc32.str('key')
// 3. Число, полученное на предыдущем шаге, преобразуется в индекс массива.
const index = Math.abs(hash) % 1000
// В значение внутреннего индексированного массива, по найденному индексу, записывается еще один массив,
// первым элементом которого становится ключ `'key'`, а вторым значение `'value'`.
internal[index] = ['key', 'value']
// */
// Почему такая странная структура для хранения? Зачем там нужен ключ? Ответ на этот вопрос будет ниже, там где мы поговорим про коллизии.
// Теперь посмотрим на чтение:
/*
const data = {}
data['key'] = 'value'
console.log(data['key']) // => "value"
// */
/*
// Для простоты показано на JavaScript, хотя в реальности всё это происходит на более низком уровне
// 1. Хешируется ключ. Результатом хеширования становится число.
const hash = crc32.str('key')
// 2. Число, полученное на предыдущем шаге преобразуется в индекс массива.
const index = Math.abs(hash % 1000)
// 3. Если индекс существует, то извлекается массив, который находился внутри, и возвращается наружу.
return internal[index] // ['key', 'value']
// */
// Коллизии ------------------
// Ключом в ассоциативном массиве может быть абсолютно любая строка (любой длины и содержания). Другими словами, множество всех возможных ключей — бесконечно. В свою очередь, результат работы хеш-функции — строка фиксированной длины, а значит множество всех выходных значений — конечно.
// Из этого факта следует, что не для всех входных данных найдётся уникальный хеш. На каком-то этапе возможно появление дублей (где под одним хешем лежит несколько разных значений — как если бы под одним индексом в массиве лежало два разных элемента). Такую ситуацию принято называть коллизией. Есть несколько способов разрешения коллизий (открытая адресация, метод цепочек), и каждому из них соответствует свой тип хеш-таблицы.
/*
// Пример коллизии
// Хеш-функция возвращает одинаковый хеш для разных строчных данных!
import crc32 from "crc-32";
console.log(crc32.str("aaaaa0.462031558722291")); // 1938556049
console.log(crc32.str("aaaaa0.0585754039730588")); // 1938556049
// */
// Простейший способ разрешения коллизий, открытая адресация, предполагает последовательное перемещение по слотам хеш-таблицы в поисках первого свободного слота, куда значение будет записано. В примере выше, для второго значения будет проверен хеш 1938556050, затем, если он занят, 1938556051, и т.д. до первого незанятого хеша.
// Коллизии не так редки, как может показаться. Убедиться в этом можно, изучив парадокс дней рождения.
/*
// exercise --------------
Это задание повышенной сложности. Если у вас не получилось решить его за разумный срок (пару часов), то не тратьте время, просто посмотрите решение учителя.

map.js
Реализуйте и экспортируйте набор функций, для работы со словарём, построенным на хеш-таблице. Для простоты, наша реализация не поддерживает разрешение коллизий.

По сути в этом задании надо реализовать объекты. По понятным причинам использовать объекты для создания объектов нельзя. Представьте что в языке объектов нет и мы их хотим добавить.

make() — создаёт новый пустой словарь и возвращает его
set(map, key, value) — устанавливает в словарь значение по ключу. Работает и для создания и для изменения. Функция возвращает true, если удалось установить значение. При возникновении коллизии, функция никак не меняет словарь и возвращает false
get(map, key, defaultValue = null) — возвращает значение указанного ключа. Параметр defaultValue — значение, которое функция возвращает, если в словаре нет ключа (по умолчанию равно null). При возникновении коллизии функция также возвращает значение по умолчанию
Функции set() и get() принимают первым параметром словарь. Передача идёт по ссылке, поэтому set() может изменить его напрямую.

import { make, set, get } from './map.js';

const map = make();
let result = get(map, 'key');
console.log(result); // => null

result = get(map, 'key', 'default_value');
console.log(result); // => "default_value"

set(map, 'key2', 'value2');
result = get(map, 'key2');
console.log(result); // => "value2"
Подсказки
Для внутреннего представления словаря, используйте массив, где индекс содержит хеш записи, а значение — key и value (их можно упаковать в массив): хэш-код: [ключ, значение]
Коллизии возникают, когда хеш одинаковый, а ключи разные.
Документация crc-32
// */
/*
// my
import crc32 from "crc-32";

// Генерирует индекс массива на основе хеша ключа.
const getIndex = (key) => Math.abs(crc32.str(key)) % 1000;

// Создает новый пустой словарь (реализован как массив).
const make = () => [];

const map = make();

// Проверяет наличие коллизии.
const hasCollision = (map, key) => {
  const index = getIndex(key);
  // Извлекаем существующий ключ из ячейки (если она не пуста)
  const [currentKey] = map[index] || [];
  // Если ключ в ячейке есть и он не равен нашему — это коллизия
  return currentKey !== key;
};

// Добавляет или обновляет значение в словаре.
// Возвращает false, если индекс занят другим ключом (коллизия).
const set = (map, key, value) => {
  const index = getIndex(key);
  // Если ячейка занята и там лежит чужой ключ — выходим с ошибкой
  if (map[index] && hasCollision(map, key)) {
    return false;
  }
  // записываем данные (ключ, значение)
  map[index] = [key, value];
  return true;
};

// Получает значение по ключу.
// Возвращает defaultValue, если ключ не найден или произошла коллизия.
const get = (map, key, defaultValue = null) => {
  const index = getIndex(key);
  // Если в ячейке пусто или там данные другого ключа — возвращаем дефолт
  if (!map[index] || hasCollision(map, key)) {
    return defaultValue;
  }
  // Извлекаем значение (второй элемент массива в ячейке)
  const [, value] = map[index];
  return value;
};

console.log(get(map, "key")); // => null
console.log(get(map, "key", "default_value")); // => "default_value"
set(map, "key2", "value2");
console.log(get(map, "key2")); // => "value2"
set(map, "key3", "value3");
console.log(get(map, "key3"));
console.log(map);
// */

// Испытание: Глубокое клонирование -1 -1
// description --------------
/*
Реализуйте и экспортируйте по умолчанию функцию, которая выполняет глубокое копирование объектов.

import cloneDeep from '../objects.js';

const data = {
  key: 'value',
  key2: {
    key: 'innerValue',
    innerKey: {
      anotherKey: 'anotherValue',
    },
  },
};

// result имеет такую же структуру, как и data
const result = cloneDeep(data);
// Но внутри другие объекты
console.log(result.key2 !== data.key2); // true
console.log(result.key2.innerKey !== data.key2.innerKey); // true

Для решения этой задачи, нужно последовательно обойти исходный объект и скопировать его данные в другой объект. Если значением какого-то свойства является объект, то нужно рекурсивно запустить реализованную функцию.

Подсказки
Для рекурсивного запуска понадобится имя для функции
_.isObject()
Object.entries()
Рекурсия
Для реализации этой задачи нельзя использовать функцию cloneDeep() библиотеки lodash.
// */

// data -------------
/*
import _ from 'lodash'

const data = {
  key: 'value',
  key2: {
    key: 'innerValue',
    innerKey: {
      anotherKey: 'anotherValue',
    },
  },
}
// */

// solution my --------------
/*
const cloneDeep = (obj) => {
  const result = {}

  const entriers = Object.entries(obj)

  for (const [key, value] of entriers) {
    result[key] = _.isObject(value) ? cloneDeep(value) : value
  }

  return result
}
// */

// solution teacher ---------------
/*
const resultLodash = _.cloneDeep(data)
// */

// test ----------------
/*
// result имеет такую же структуру, как и data
const result = cloneDeep(data)
// Но внутри другие объекты
console.log(result.key2 !== data.key2) // true
console.log(result.key2.innerKey !== data.key2.innerKey) // true
console.log(result)

console.log(resultLodash.key2 === data.key2) // true
console.log(resultLodash.key2.innerKey === data.key2.innerKey) // true
console.log(resultLodash)
// */

// Испытание: Сборщик строки запроса +1
/*
Query String (строка запроса) - часть адреса страницы в интернете, содержащая константы и их значения. Она начинается после вопросительного знака и идет до конца адреса. Пример:

# query string: page=5
https://ru.hexlet.io/blog?page=5
Если параметров несколько, то они отделяются амперсандом &:

# query string: page=5&per=10
https://ru.hexlet.io/blog?per=10&page=5
buildQueryString.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход список параметров и возвращает сформированный query string из этих параметров:

import bqs from '../buildQueryString.js';

bqs({ per: 10, page: 1 });
// page=1&per=10
bqs({ param: 'all', param1: true });
// param=all&param1=true
Имена параметров в выходной строке должны располагаться в алфавитном порядке (то есть их нужно отсортировать).
// */
/*
// my
const bqs = (obj) => {
  let str = "";
  const entries = Object.entries(obj).sort();
  for (let [key, value] of entries) {
    if (entries.length > 1) {
      str += `${key}=${value}&`;
    } else {
      str += `${key}=${value}`;
    }
  }
  if (str[str.length - 1] === "&") {
    return str.slice(0, -1);
  }

  return str;
};

console.log(bqs({ per: 10, page: 1 })); // page=1&per=10
// */
/*
// teacher
const bqs = (obj) => {
  const entries = Object.entries(obj).sort();
  const result = [];
  for (let [key, value] of entries) {
    result.push(`${key}=${value}`);
  }
  return result.join("&");
};
console.log(bqs({ per: 10, page: 1 })); // page=1&per=10
// */

// Испытание: Преобразование DNA в RNA -1
/*
ДНК и РНК это последовательности нуклеотидов.
Четыре нуклеотида в ДНК это аденин (A), цитозин (C), гуанин (G) и тимин (T).
Четыре нуклеотида в РНК это аденин (A), цитозин (C), гуанин (G) и урацил (U).
Цепь РНК составляется на основе цепи ДНК последовательной заменой каждого нуклеотида:
G -> C
C -> G
T -> A
A -> U
dnaToRna.js
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход цепь ДНК и возвращает соответствующую цепь РНК (совершает транскрипцию РНК).
Если во входном параметре нет ни одного нуклеотида (т.е. передана пустая строка), то функция должна вернуть пустую строку. Если в переданной цепи ДНК встретится "незнакомый" нуклеотид (не являющийся одним из четырех перечисленных выше), то функция должна вернуть null.

dnaToRna('ACGTGGTCTTAA'); // 'UGCACCAGAAUU'
dnaToRna('CCGTA'); // 'GGCAU'
dnaToRna(''); // ''
dnaToRna('ACNTG'); // null
// */
/*
// my
const dnaToRna = (str) => {
  const dnkRnk = { G: "C", C: "G", T: "A", A: "U" };
  let result = "";

  for (let char of str) {
    if (!dnkRnk[char]) {
      return null;
    }
    result += dnkRnk[char];
  }
  return result;
};
console.log(dnaToRna("")); //'GGCAU'
// */
/*
// teacher
const map = { G: "C", C: "G", T: "A", A: "U" };

const dnaToRna = (dna) => {
  const rna = [];
  for (const nucleotide of dna) {
    if (!Object.hasOwn(map, nucleotide)) {
      return null;
    }
    rna.push(map[nucleotide]);
  }
  return rna.join("");
};

console.log(dnaToRna("CCGTA")); //'GGCAU'
// */

// Испытание: Представление массива в виде объекта -1
/*
Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход массив, состоящий из массивов-пар и возвращает объект, полученный из этих пар.
Примечания
Если при конструировании объекта попадаются совпадающие ключи, то берётся значение из последнего массива-пары:
fromPairs([['cat', 5], ['dog', 6], ['cat', 11]])
// { 'cat': 11, 'dog': 6 }
Примеры
fromPairs([['fred', 30], ['barney', 40]]);
// { 'fred': 30, 'barney': 40 }
В решении постарайтесь не использовать встроенные методы преобразования в объект, например, Object.fromEntries().
// */
/*
// my
const fromPairs = (arr) => {
  const result = {};
  for (const [key, value] of arr) {
    result[key] = value;
  }
  return result;
};
console.log(
  fromPairs([
    ["cat", 5],
    ["dog", 6],
    ["cat", 11],
  ]),
);
// techer the same
// */

// Испытания: Римские цифры -1
/*
Для записи цифр римляне использовали буквы латинского алфавита: I, V, X, L, C, D, M. Например:
1 обозначалась с помощью буквы I
10 с помощью Х
7 с помощью VII
Число 2020 в римской записи — это MMXX (2000 = MM, 20 = XX).
solution.js
Реализуйте и экспортируйте функцию toRoman(), которая переводит арабские числа в римские. Функция принимает на вход целое число в диапазоне от 1 до 3000, а возвращает строку с римским представлением этого числа.
Реализуйте и экспортируйте функцию toArabic(), которая переводит число в римской записи в число, записанное арабскими цифрами. Если переданное римское число не корректно, то функция должна вернуть значение false.
Примеры
toRoman(1);
// 'I'
toRoman(59);
// 'LIX'
toRoman(3000);
// 'MMM'
toArabic('I');
// 1
toArabic('LIX');
// 59
toArabic('MMM');
// 3000
toArabic('IIII');
// false
toArabic('VX');
// false
Подсказки
Подробнее о римской записи — https://ru.wikipedia.org/wiki/Римские_цифры
// */
/*
// my
const romanData = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const romanValues = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

const romanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

const toRoman = (num, index = 0) => {
  if (num === 0) return "";
  const [value, symbol] = romanData[index];
  if (num >= value) {
    return symbol + toRoman(num - value, index);
  } else {
    return toRoman(num, index + 1);
  }
};

const toArabic = (roman) => {
  if (!roman || typeof roman != "string" || !romanRegex.test(roman)) {
    return false;
  }
  const convert = (str) => {
    if (str.length === 0) return 0;
    const current = romanValues[str[0]];
    const next = romanValues[str[1]] || 0;
    if (next > current) {
      return next - current + convert(str.slice(2));
    } else {
      return current + convert(str.slice(1));
    }
  };
  return convert(roman);
};

console.log(toRoman(1001));
console.log(toArabic("LIX"));
// */

/*
// teacher
const numerals = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const sortedNumerals = Object.entries(numerals).sort(
  ([, arabic1], [, arabic2]) => Math.sign(arabic2 - arabic1),
);

const toRoman = (number) => {
  let digit = number;
  const result = [];
  for (const [roman, arabic] of sortedNumerals) {
    const repetitionsCount = Math.floor(digit / arabic);
    if (repetitionsCount > 0) {
      digit -= repetitionsCount * arabic;
      result.push(roman.repeat(repetitionsCount));
    }
  }
  return result.join("");
};

const toArabic = (romanNumber) => {
  let result = 0;
  let currentLine = romanNumber;
  for (const [roman, arabic] of sortedNumerals) {
    while (currentLine.indexOf(roman) === 0) {
      result += arabic;
      currentLine = currentLine.slice(roman.length);
    }
  }
  if (toRoman(result) != romanNumber) {
    return false;
  }
  return result;
};

console.log(toRoman(191));
console.log(toArabic("CXCI"));
// */

// Испытание: Вычислитель отличий -1
/*
Иногда в программировании возникает задача поиска разницы между двумя наборами данных, такими как объекты. Например, при поиске различий в json файлах. Для этого даже существуют специальные сервисы, например, http://www.jsondiff.com/ (попробуйте нажать на ссылку sample data и затем кнопку Compare).

solution.js
Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает два объекта и возвращает результат сравнения в виде объекта. Ключами результирующего объекта будут все ключи из двух входящих объектов, а значением строка с описанием отличий: added, deleted, changed или unchanged.

Возможные значения:

added — ключ отсутствовал в первом объекте, но был добавлен во второй
deleted — ключ был в первом объекте, но отсутствует во втором
changed — ключ присутствовал и в первом и во втором объектах, но значения отличаются
unchanged — ключ присутствовал и в первом и во втором объектах с одинаковыми значениями
import genDiff from './diffGenerator.js';

Подсказки
Фрагмент этой задачи разбирается в докладе "Ментальное программирование"
// */

// data -------------
/*
import _ from 'lodash'
// */

// solution my --------------
/*
const genDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 })

  return keys.reduce((acc, key) => {
    if (!(key in obj1)) {
      acc[key] = 'added'
    } else if (!(key in obj2)) {
      acc[key] = 'deleted'
    } else if (obj1[key] === obj2[key]) {
      acc[key] = 'unchenged'
    } else {
      acc[key] = 'chenged'
    }
    return acc
  }, {})
}
// */

// solution teacher better ----------------
/*
const genDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1)
  const key2 = Object.keys(obj2)
  const keys = _.union(key1, key2)
  const result = {}
  for (const key of keys) {
    if (!Object.hasOwn(obj1, key)) {
      result[key] = 'added'
    } else if (!Object.hasOwn(obj2, key)) {
      result[key] = 'deleted'
    } else if (obj1[key] === obj2[key]) {
      result[key] = 'unchanged'
    } else {
      result[key] = 'chenged'
    }
  }

  return result
}
// */

// test ----------------
/*
console.log(
  genDiff(
    { one: 'eon', two: 'two', four: true },
    { two: 'own', zero: 4, four: true },
  ),
)
// {
//   one: 'deleted',
//   two: 'changed',
//   four: 'unchanged',
//   zero: 'added',
// }
// */

// Испытание: Детектирование -1
/*
Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив (элементы которого — это объекты) и пары ключ-значение (тоже в виде объекта), а возвращает первый элемент исходного массива, значения которого соответствуют переданным парам (всем переданным). Если совпадений не было, то функция должна вернуть null.

Примеры
findWhere(
  [
    { title: 'Book of Fooos', author: 'FooBar', year: 1111 },
    { title: 'Cymbeline', author: 'Shakespeare', year: 1611 },
    { title: 'The Tempest', author: 'Shakespeare', year: 1611 },
    { title: 'Book of Foos Barrrs', author: 'FooBar', year: 2222 },
    { title: 'Still foooing', author: 'FooBar', year: 3333 },
    { title: 'Happy Foo', author: 'FooBar', year: 4444 },
  ],
  { author: 'Shakespeare', year: 1611 }
); // { title: 'Cymbeline', author: 'Shakespeare', year: 1611 }
// */

/*
// my
const findWhere = (data, query) => {
  for (const item of data) {
    let isFlag = true;
    for (const [key, value] of Object.entries(query)) {
      if (item[key] !== value) {
        isFlag = false;
        break;
      }
    }
    if (isFlag) {
      return item;
    }
  }
  return null;
};

console.log(
  findWhere(
    [
      { title: "Book of Fooos", author: "FooBar", year: 1111 },
      { title: "Cymbeline", author: "Shakespeare", year: 1611 },
      { title: "The Tempest", author: "Shakespeare", year: 1611 },
      { title: "Book of Foos Barrrs", author: "FooBar", year: 2222 },
      { title: "Still foooing", author: "FooBar", year: 3333 },
      { title: "Happy Foo", author: "FooBar", year: 4444 },
    ],
    { author: "Shakespeare", year: 1611 },
  ),
);
// */

/*
// teacher
const findWhere = (data, query) => {
  const entries = Object.entries(query);
  for (const item of data) {
    let find = true;
    for (const [key, value] of entries) {
      if (item[key] !== value) {
        find = false;
        break;
      }
    }
    if (find) {
      return item;
    }
  }
  return null;
};

console.log(
  findWhere(
    [
      { title: "Book of Fooos", author: "FooBar", year: 1111 },
      { title: "Cymbeline", author: "Shakespeare", year: 1611 },
      { title: "The Tempest", author: "Shakespeare", year: 1611 },
      { title: "Book of Foos Barrrs", author: "FooBar", year: 2222 },
      { title: "Still foooing", author: "FooBar", year: 3333 },
      { title: "Happy Foo", author: "FooBar", year: 4444 },
    ],
    { author: "Shakespeare", year: 1611 },
  ),
);
// */

// Испытание: Скрэббл -1
/*
Реализуйте и экспортируйте по умолчанию функцию-предикат, которая принимает на вход два параметра: набор символов в нижнем регистре (строку) и слово, и проверяет, можно ли из переданного набора составить это слово. В результате вызова функция возвращает true или false.

При проверке учитывается количество символов, нужных для составления слова, и не учитывается их регистр.

Примеры
scrabble('rkqodlw', 'world'); // true
scrabble('avj', 'java'); // false
scrabble('avjafff', 'java'); // true
scrabble('', 'hexlet'); // false
scrabble('scriptingjava', 'JavaScript'); // true
// */

/*
// my
const scrabble = (symbols, word) => {
  const symbolsCount = {};
  for (const symbol of symbols) {
    symbolsCount[symbol] = (symbolsCount[symbol] || 0) + 1;
  }
  for (const symbol of word.toLowerCase()) {
    if (!symbolsCount[symbol]) {
      return false;
    }
    symbolsCount[symbol] -= 1;
  }
  return true;
};

console.log(scrabble("rkqodlw", "world"));
// */

/*
// teacher
import _ from "lodash";

const countByChars = (str) => {
  const chars = {};

  for (const char of str) {
    const count = _.get(chars, char, 0);
    chars[char] = count + 1;
  }

  return chars;
};

const scrabble = (str, word) => {
  const countsChars = countByChars(str);

  for (const char of word.toLowerCase()) {
    const count = _.get(countsChars, char, 0);
    if (count === 0) {
      return false;
    }
    countsChars[char] -= 1;
  }

  return true;
};

console.log(scrabble("rkqodlw", "world"));
// */

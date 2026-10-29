/* // Манкипатчинг
import nock from 'nock'
import getFunction from './trial-6.js'
import { test, expect } from 'vitest'

const getUserMainLanguage = getFunction()

nock.disableNetConnect()

// */

/* // description
В этом задании нужно протестировать в файле __tests__/getUserMainLanguage.js функцию getUserMainLanguage(username) манки патчингом через библиотеку nock.

Функция определяет язык, на котором пользователь создал больше всего репозиториев. Она запрашивает через @octokit/rest список репозиториев пользователя username, берёт у каждого репозитория поле language и возвращает тот язык, который встречается чаще. Если список репозиториев пуст, функция возвращает null. Второй параметр client в этом задании не передаётся. Тогда функция создаёт настоящий клиент @octokit/rest, и его HTTP-запрос перехватывает nock.

// GitHub отвечает списком [{ language: 'php' }, { language: 'js' }, { language: 'php' }]
await getUserMainLanguage('linus') // 'php'

// GitHub отвечает пустым списком []
await getUserMainLanguage('linus') // null
Тесты запускаются на правильной реализации getUserMainLanguage() и на неправильных из файла functions.js. На правильной реализации они должны пройти, а на каждой неправильной упасть, иначе решение не засчитывается. Поэтому проверьте оба случая, список с языками и пустой список.

Подсказки
В тестах выключены реальные запросы. Это значит, что если запустить тесты, в которых выполняется реальный запрос, nock его перехватит и выведет на экран. Так можно узнать адреса по которым @octokit/rest выполняет свои запросы. Например, вызов getUserMainLanguage('linus') без подмены завершается такой ошибкой.

Request to https://api.github.com/users/linus/repos failed, reason: Nock: Disallowed net connect for "api.github.com:443/users/linus/repos"
Подмена срабатывает на один запрос, поэтому каждый тест описывает свой ответ вызовом nock()
// */

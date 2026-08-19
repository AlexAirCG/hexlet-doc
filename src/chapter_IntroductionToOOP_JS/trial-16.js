//* // ПОИСК В ДВОИЧНОМ ДЕРЕВЕ

// */

/* // example
const tree = new Node(
  9,
  new Node(4, new Node(3), new Node(6, new Node(5), new Node(7))),
  new Node(17, null, new Node(22, new Node(20), null)),
)

console.log(tree.getKey())

const node = tree.search(6)
console.log(node.getKey()) // 6
console.log(node.getLeft().getKey()) // 5
console.log(node.getRight().getKey()) // 7

console.log(tree.search(35)) // null
console.log(tree.search(3).getLeft()) // null
// */

/* // description
Реализуйте и экспортируйте по умолчанию класс, который реализует представление узла. Конструктор класса принимает на вход значение ключа (число), и двух детей, которые в свою очередь также являются узлами. Дерево может быть создано пустым.

Класс должен содержать методы:

- Геттер getKey() — возвращает ключ. Если дерево пустое, возвращает null.
- Геттеры getLeft(), getRight() — возвращают соответственно левого и правого ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
- search(key) — выполняет поиск узла в правильном двоичном дереве по ключу и возвращает узел. Если узел не найден, возвращается null.
// */

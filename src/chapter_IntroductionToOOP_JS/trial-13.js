//* // ПОСТРОЕНИЕ ДВОИЧНОГО ДЕРЕВА

// */

/* // example
const tree = new Node()

tree.insert(9)
tree.insert(17)
tree.insert(4)
tree.insert(3)
tree.insert(6)

console.log(tree.getKey()) // 9
console.log(tree.getLeft().getKey()) // 4
console.log(tree.getRight().getKey()) // 17
console.log(tree.getLeft().getLeft().getKey()) // 3
console.log(tree.getLeft().getRight().getKey()) // 6
// */

/* // description
Реализуйте и экспортируйте по умолчанию класс, который реализует представление узла.

Класс должен содержать:

- Геттер getKey() — возвращает ключ.
- Геттеры getLeft(), getRight() — возвращают соответственно левого и правого ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
- Метод insert(key) — выполняет добавление узла, формируя правильное двоичное дерево.
// */

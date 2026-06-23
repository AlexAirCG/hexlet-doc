// my solution
const makeUser = ({ id = null, friends = [] } = {}) => ({
  friends,
  id,
  getFriends() {
    return this.friends.slice() // возвращение копии массива, чтобы его не изменили извне
  },
})

const user1 = makeUser({
  friends: [
    makeUser({ id: 1 }),
    makeUser({ id: 2 }), // общий друг
  ],
})
const user2 = makeUser({
  friends: [
    makeUser({ id: 2 }), // общий друг
    makeUser({ id: 3 }),
  ],
})

/*
// my solution
export const getMutualFriends = (user1, user2) => {
  const friends1 = user1.getFriends()
  const friends2 = user2.getFriends()

  return friends1.filter((friend1) => {
    return friends2.some((friend2) => friend2.id === friend1.id)
  })
}
// */

//*
// teacher solution
export const getMutualFriends = (user1, user2) => {
  const friends1 = user1.getFriends()
  const friends2 = user2.getFriends()
  const friends2Ids = friends2.map(({ id }) => id)
  return friends1.filter(({ id }) => friends2Ids.includes(id))
}
// */

// 1. Достать списки друзей у обоих пользователей.
// 2. Сделать список «ориентиров» (их ID), по которым я буду искать совпадения у второго пользователя.
// 3. Отфильтровать список первого пользователя, оставив только тех, чей ID есть в списке ориентиров.
// 4. Вернуть результат.

export default makeUser

console.log(getMutualFriends(user1, user2))

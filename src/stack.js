const makeStack = () => {
  const items = []

  return {
    push: (item) => items.push(item),
    pop: () => {
      if (items.length === 0) {
        throw new Error('Stack is Empty')
      }
      return items.pop()
    },
    isEmpty: () => items.length === 0,
  }
}

export default makeStack

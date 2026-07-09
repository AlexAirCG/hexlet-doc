const solution = (value) => {
  return {
    value,
    toString() {
      return `Value is ${this.value}`
    },
  }
}

export default solution

console.log(solution(1) + '')

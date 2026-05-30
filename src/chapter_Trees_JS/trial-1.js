const removeFirstLevel = (tree) => {
  const nodes = tree.filter(Array.isArray)
  return nodes.flat()
}

export default removeFirstLevel

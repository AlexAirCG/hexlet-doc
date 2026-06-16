const changeClass = (tree, classNameFrom, classNameTo) => {
  const innerFunc = (node) => {
    const updateNode = { ...node }

    if (Object.hasOwn(node, 'className')) {
      const newClassName =
        node.className === classNameFrom ? classNameTo : node.className
      updateNode.className = newClassName
    }

    if (node.type === 'tag-internal') {
      const newChildren = node.children.map(innerFunc)
      updateNode.children = newChildren
    }

    return updateNode
  }

  return innerFunc(tree)
}

export default changeClass

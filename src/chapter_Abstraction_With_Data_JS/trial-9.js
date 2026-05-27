import { uniqueId } from 'es-toolkit/compat'

export const createTask = (description, tags = []) => {
  const uniqTags = new Set(tags)
  const newTask = {
    id: uniqueId(),
    description,
    completed: false,
    tags: [...uniqTags],
  }
  return newTask
}

export const addTask = (tasks, task) => [...tasks, task]

export const addTagToTask = (tasks, taskId, tag) => {
  return tasks.map((t) => {
    if (t.id === taskId) {
      if (!t.tags.includes(tag)) {
        return {
          ...t,
          tags: [...t.tags, tag],
        }
      }
    }
    return t
  })
}

export const removeTagFromTask = (tasks, taskId, tag) => {
  return tasks.map((t) => {
    if (t.id === taskId) {
      return {
        ...t,
        tags: t.tags.filter((currTag) => currTag !== tag),
      }
    }
    return t
  })
}

export const markTaskCompleted = (tasks, taskId) => {
  return tasks.map((t) => {
    if (t.id === taskId) {
      return {
        ...t,
        completed: true,
      }
    }
    return t
  })
}

export const filterTasksByTags = (tasks, filterTags = []) => {
  if (filterTags.length === 0) {
    return tasks
  }

  return tasks.filter((task) =>
    filterTags.every((tag) => task.tags.includes(tag)),
  )
}

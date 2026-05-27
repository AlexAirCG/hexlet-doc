import {
  createTask,
  addTask,
  addTagToTask,
  removeTagFromTask,
  markTaskCompleted,
  filterTasksByTags,
} from '../../src/chapter_Abstraction_With_Data_JS/trial-9.js'

describe('todo list', () => {
  let tasks = []

  beforeEach(() => {
    tasks = [
      {
        id: 1,
        description: 'Task 1',
        completed: false,
        tags: ['work'],
      },
      {
        id: 2,
        description: 'Task 2',
        completed: true,
        tags: ['home', 'urgent'],
      },
    ]
  })

  it('createTask and addTask', () => {
    const newTask = createTask('New task', ['work', 'important', 'work'])
    const newTasks = addTask(tasks, newTask)
    expect(newTasks).toHaveLength(3)
    expect(newTasks[2].description).toBe('New task')
    expect(newTasks[2].completed).toBe(false)
    expect(newTasks[2].tags).toEqual(['work', 'important'])
  })

  it('addTagToTask, removeTagFromTask, markTaskCompleted', () => {
    const task = {
      id: 3,
      description: 'Task 3',
      completed: false,
      tags: ['project', 'urgent'],
    }
    let newTasks = addTask(tasks, task)
    expect(newTasks[2].tags).toEqual(['project', 'urgent'])

    newTasks = addTagToTask(newTasks, 3, 'review')
    expect(newTasks[2].tags).toContain('review')

    newTasks = removeTagFromTask(newTasks, 3, 'urgent')
    expect(newTasks[2].tags).not.toContain('urgent')

    newTasks = markTaskCompleted(newTasks, 1)
    expect(newTasks[0].completed).toBe(true)
  })

  it('filterTasksByTags', () => {
    const filteredTasks = filterTasksByTags(tasks)
    expect(filteredTasks).toEqual(tasks)

    const filteredTasks2 = filterTasksByTags(tasks, ['home'])
    expect(filteredTasks2).toHaveLength(1)
    expect(filteredTasks2[0].id).toBe(2)

    const filteredTasks3 = filterTasksByTags(tasks, ['postponed'])
    expect(filteredTasks3).toHaveLength(0)
  })
})

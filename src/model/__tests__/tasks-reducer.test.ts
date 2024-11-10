import { addTaskAC, updateTaskAC, removeTaskAC, setTasks, tasksReducer, TasksStateType } from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC, setTodolists } from "../todolists-reducer"
import { v1 } from "uuid"
import { TaskStatus } from "../../fuetures/todolists/api/tasks-api"
let todolistId1: string
let todolistId2: string
let startState: TasksStateType
beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.done,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.done,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
    ],
  }
})
test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"))

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.done,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
    ],
  })
})
test("correct task should be added to correct array", () => {
  const endState = tasksReducer(
    startState,
    addTaskAC(
      {
        id: v1(),
        title: "juice",
        status: 0,
        todoListId: "todolistId2",
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      "todolistId2",
    ),
  )

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.notReady)
})
test("status of specified task should be changed", () => {
  const endState = tasksReducer(startState, updateTaskAC("2", { status: TaskStatus.notReady }, "todolistId2"))

  expect(endState["todolistId2"][1].status).toBe(TaskStatus.notReady)
  expect(endState["todolistId1"][1].status).not.toBe(TaskStatus.notReady)
})
test("title of specified task should be changed", () => {
  const endState = tasksReducer(startState, updateTaskAC("2", { title: "New title" }, "todolistId2"))

  expect(endState["todolistId2"][1].title).toBe("New title")
  expect(endState["todolistId1"][1].status).not.toBe("JS")
})
test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(
    startState,
    addTodolistAC({
      id: "5",
      addedDate: "",
      order: 1,
      title: "new todolist",
      filter: "all",
    }),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test("property with todolistId should be deleted", () => {
  const action = removeTodolistAC("todolistId2")

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
test("empty arrays should be added when we set todolists", () => {
  const action = setTodolists([
    { id: "1", title: "What to learn", addedDate: "", order: 0 },
    { id: "2", title: "What to buy", addedDate: "", order: 0 },
  ])

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["1"]).toStrictEqual([])
  // or
  expect(endState["2"]).toStrictEqual([])
})
test("tasks should be set to the state", () => {
  const startState = {
    "1": [],
    "2": [],
  }
  const action = setTasks(
    [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.notReady,
        todoListId: todolistId1,
        completed: false,
        priority: 0,
        startDate: "",
        deadline: "",
        description: null,
        order: 0,
        addedDate: "",
      },
    ],
    "1",
  )
  const endState = tasksReducer(startState, action)
  expect(endState[1]).toEqual([
    {
      id: "1",
      title: "bread",
      status: TaskStatus.notReady,
      todoListId: todolistId1,
      completed: false,
      priority: 0,
      startDate: "",
      deadline: "",
      description: null,
      order: 0,
      addedDate: "",
    },
    {
      id: "3",
      title: "tea",
      status: TaskStatus.notReady,
      todoListId: todolistId1,
      completed: false,
      priority: 0,
      startDate: "",
      deadline: "",
      description: null,
      order: 0,
      addedDate: "",
    },
  ])
})

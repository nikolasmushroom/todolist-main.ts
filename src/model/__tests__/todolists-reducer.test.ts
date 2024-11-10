import {
  addTodolistAC,
  changeTodolistFilter,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolists,
  TodolistDomainType,
  todolistsReducer,
} from "../todolists-reducer"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const newTitle = "New Todolist"

  const endState = todolistsReducer(startState, addTodolistAC({ id: todolistId1, title: newTitle, filter: "all", addedDate: "", order: 0 }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
})

test("correct todolist should change its name", () => {
  const newTitle = "New Todolist"

  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title: newTitle }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTitle)
})

test("correct filter of todolist should be changed", () => {
  const newFilter = "completed"

  const endState = todolistsReducer(startState, changeTodolistFilter({ id: todolistId2, filter: newFilter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})
test("todolists should be set to the state", () => {
  const action = setTodolists(startState)
  const endState = todolistsReducer([], action)
  expect(endState.length).toBe(2)
})

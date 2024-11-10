import { AddTodolistActionType, RemoveTodolistActionType, setTodolistsActionType } from "./todolists-reducer"
import { changeThemeModeActionType } from "../app/app-reducer"
import { taskAPI, TaskType, UpdateTaskModel } from "../fuetures/todolists/api/tasks-api"
import { Dispatch } from "redux"

const initialState: TasksStateType = {}
export type TasksStateType = {
  [key: string]: TaskType[]
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskid),
      }
    }
    case "ADD-TASK": {
      const newTask: TaskType = action.payload.task
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId] ? [newTask, ...state[action.payload.todolistId]] : [newTask],
      }
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                ...action.payload.model,
              }
            : t,
        ),
      }
    }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolist.id]: [],
      }
    case "SET_TODOLISTS":
      const copyState = { ...state }
      action.todolists.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    case "REMOVE-TODOLIST":
      const stateCopy = { ...state }
      delete stateCopy[action.payload.id]
      return stateCopy
    case "SET-TASKS":
      const newState = { ...state }
      newState[action.todolistId] = action.tasks
      return newState
    default:
      return state
  }
}

// Action creators
export const removeTaskAC = (taskid: string, todolistId: string) => {
  return { type: "REMOVE-TASK", payload: { taskid, todolistId } } as const
}
export const addTaskAC = (task: TaskType, todolistId: string) => {
  return { type: "ADD-TASK", payload: { task, todolistId } } as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModel, todolistId: string) => {
  return { type: "UPDATE-TASK", payload: { taskId, todolistId, model } } as const
}
export const setTasks = (tasks: TaskType[], todolistId: string) => {
  return {
    type: "SET-TASKS",
    tasks: tasks,
    todolistId: todolistId,
  } as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  taskAPI.getTasks(todolistId).then((response) => {
    dispatch(setTasks(response.data.items, todolistId))
  })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  taskAPI.deleteTask({ todolistId, taskId }).then((response) => {
    dispatch(removeTaskAC(taskId, todolistId))
  })
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  taskAPI.createTask({ todolistId, title }).then((response) => {
    dispatch(addTaskAC(response.data.data.item, todolistId))
  })
}
export type UpdateDomainTaskModel = {
  title?: string
  description?: string | null
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
export const updateTaskTC = (todolistId: string, model: UpdateDomainTaskModel, task: TaskType) => (dispatch: Dispatch) => {
  const taskId = task.id
  const apiModel: UpdateTaskModel = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...model,
  }
  taskAPI.updateTask({ todolistId, taskId, apiModel }).then((response) => {
    dispatch(updateTaskAC(task.id, response.data.data.item, todolistId))
  })
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasks>

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | changeThemeModeActionType
  | setTodolistsActionType
  | SetTasksActionType

import { v1 } from "uuid"
import { todolistAPI, TodolistType } from "../fuetures/todolists/api/todolists-api"
import { Dispatch } from "redux"

const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      return [action.todolist, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case "SET_TODOLISTS": {
      return action.todolists.map((t) => {
        return {
          ...t,
          filter: "all",
        }
      })
    }
    default:
      return state
  }
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id: todolistId } } as const
}

export const addTodolistAC = (todolist: TodolistDomainType) => {
  return { type: "ADD-TODOLIST", todolist } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilter = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}
export const setTodolists = (todolists: TodolistType[]) => {
  return { type: "SET_TODOLISTS", todolists: todolists } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>
export type setTodolistsActionType = ReturnType<typeof setTodolists>

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
  todolistAPI.getTodolists().then((response) => {
    dispatch(setTodolists(response.data))
  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  const todolistId = v1()
  todolistAPI.createTodolist(title).then((response) => {
    dispatch(addTodolistAC({ ...response.data.data.item, filter: "all" }))
  })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTodolist(todolistId).then((response) => {
    dispatch(removeTodolistAC(todolistId))
  })
}
export const updateTodolistTitleTC = (params: { id: string; title: string }) => (dispatch: Dispatch) => {
  const { id, title } = params
  todolistAPI.changeTodolistTitle({ id, title }).then((response) => {
    dispatch(changeTodolistTitleAC({ id, title }))
  })
}

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | setTodolistsActionType

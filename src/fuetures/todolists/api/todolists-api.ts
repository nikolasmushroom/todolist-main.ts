import { BaseResponse } from "common/types"
import { baseURL } from "common/instance"

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
export type newTodolistItem = {
  item: TodolistType
}
export const todolistAPI = {
  getTodolists() {
    return baseURL.get<TodolistType[]>(`/todo-lists`, {}).then((response) => {
      return response
    })
  },
  createTodolist(title: string) {
    return baseURL.post<BaseResponse<newTodolistItem>>(`/todo-lists`, { title: title }).then((response) => {
      return response
    })
  },
  deleteTodolist(id: string) {
    return baseURL.delete<BaseResponse>(`/todo-lists/${id}`).then((response) => {
      return response
    })
  },
  changeTodolistTitle(params: { id: string; title: string }) {
    const { id, title } = params
    return baseURL.put<BaseResponse>(`/todo-lists/${id}`, { title: title }, {}).then((response) => {
      return response
    })
  },
}

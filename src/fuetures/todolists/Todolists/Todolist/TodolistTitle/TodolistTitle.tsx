import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteTodolistTC, TodolistDomainType, updateTodolistTitleTC } from "../../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"
type TodolistTitle = {
  todolist: TodolistDomainType
}
export const TodolistTitle = ({ todolist }: TodolistTitle) => {
  const dispatch = useAppDispatch()
  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolist.id, title }))
  }
  const removeTodolist = () => {
    dispatch(deleteTodolistTC(todolist.id))
  }
  return (
    <div className={"todolist-title-container"}>
      <h3>
        <EditableSpan value={todolist.title} onChange={updateTodolist} />
      </h3>
      <IconButton onClick={removeTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

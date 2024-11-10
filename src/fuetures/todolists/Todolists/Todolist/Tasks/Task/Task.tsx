import { getListItemSx } from "../../Todolist.styles"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { removeTaskTC, updateTaskTC } from "../../../../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks"
import { TaskStatus, TaskType } from "../../../../api"

type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const Task = ({ task, todolistId }: TaskPropsType) => {
  const dispatch = useAppDispatch()
  const removeTaskHandler = () => {
    dispatch(removeTaskTC(task.id, todolistId))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady
    dispatch(updateTaskTC(todolistId, { status }, task))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC(todolistId, { title }, task))
  }
  const TaskStatusValue = task.status === TaskStatus.done
  return (
    <ListItem sx={getListItemSx(task.status)}>
      <div>
        <Checkbox checked={TaskStatusValue} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

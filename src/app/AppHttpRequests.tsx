import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { EditableSpan } from "../common/components/EditableSpan/EditableSpan"

import { todolistAPI, TodolistType } from "../fuetures/todolists/api/todolists-api"
import { TaskType, taskAPI, TaskStatus, UpdateTaskModel } from "../fuetures/todolists/api/tasks-api"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<any>([])
  const [tasks, setTasks] = useState<{ [key: string]: TaskType[] }>({})

  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl: TodolistType) => {
        taskAPI.getTasks(tl.id).then((response) => {
          setTasks((tasks) => ({ ...tasks, [tl.id]: response.data.items }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistAPI.createTodolist(title).then((response) => {
      if (response.data.resultCode === 0) {
        const newTodolist = response.data.data.item
        setTodolists([...todolists, newTodolist])
      }
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistAPI.deleteTodolist(id).then((response) => {
      if (response.data.resultCode === 0) {
        setTodolists(todolists.filter((tl: TodolistType) => tl.id !== id))
      }
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistAPI.changeTodolistTitle({ id, title }).then((response) => {
      if (response.data.resultCode === 0) {
        setTodolists(todolists.map((tl: TodolistType) => (tl.id === id ? { ...tl, title: title } : tl)))
      }
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    taskAPI.createTask({ todolistId, title }).then((response) => {
      if (response.data.resultCode === 0) {
        setTasks({ ...tasks, [todolistId]: [response.data.data.item, ...tasks[todolistId]] })
      }
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    taskAPI.deleteTask({ todolistId, taskId }).then((res) => {
      if (res.data.resultCode === 0) {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
      }
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: TaskType, todolistId: string) => {
    const taskId = task.id
    const apiModel: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      status: e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    taskAPI.updateTask({ todolistId, taskId, apiModel }).then((res) => {
      if (res.data.resultCode === 0) {
        const newTask = res.data.data.item
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? newTask : t)) })
      }
    })
  }

  const changeTaskTitleHandler = (title: string, task: any, todolistId: string) => {
    const taskId = task.id
    const apiModel: UpdateTaskModel = {
      title: title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    taskAPI.updateTask({ todolistId, taskId, apiModel }).then((res) => {
      if (res.data.resultCode === 0) {
        const newTask = res.data.data.item
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? newTask : t)) })
      }
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {todolists.map((tl: any) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: any) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === TaskStatus.done} onChange={(e) => changeTaskStatusHandler(e, task, tl.id)} />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task, tl.id)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}

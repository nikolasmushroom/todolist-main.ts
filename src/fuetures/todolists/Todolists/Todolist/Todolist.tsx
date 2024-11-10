import { AddItemForm } from "common/components";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { Tasks } from "./Tasks/Tasks";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { addTasksTC } from "../../../../model/tasks-reducer";
import { useAppDispatch } from "common/hooks";
import { TodolistDomainType } from "../../../../model/todolists-reducer";

type PropsType = {
  todolist: TodolistDomainType;
};

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch();
  const addTaskCallback = (title: string) => {
    dispatch(addTasksTC(todolist.id, title));
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};

import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";
import React, { useEffect } from "react";
import { useAppSelector } from "common/hooks";
import { useAppDispatch } from "common/hooks";
import { fetchTodolistTC } from "../../../model/todolists-reducer";

export const Todolists = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector((state) => state.todolists);
  useEffect(() => {
    dispatch(fetchTodolistTC());
  }, []);
  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};

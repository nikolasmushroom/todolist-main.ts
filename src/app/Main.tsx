import { Grid } from "@mui/material"
import Container from "@mui/material/Container"
import { addTodolistTC } from "../model/todolists-reducer"
import { Todolists } from "../fuetures/todolists/Todolists/Todolists"
import {AppDispatch} from "./store.ts";
import {useAppDispatch} from "../common/hooks";
import {AddItemForm} from "../common/components";

export const Main = () => {
  const dispatch : AppDispatch = useAppDispatch()

  const addTodolist = (title: string) => {
    const action = addTodolistTC(title)
    dispatch(action)
  }
  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={6}>
        <Todolists />
      </Grid>
    </Container>
  )
}

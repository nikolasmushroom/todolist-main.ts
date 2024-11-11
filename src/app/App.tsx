import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Main } from "./Main"
import { RootState } from "./store"
import {Header} from "../common/components";
import {getTheme} from "../common/theme";
import {useAppSelector} from "../common/hooks";


export const selectThemeMode = (state: RootState) => {
  return state.app?.themeMode
}
export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}

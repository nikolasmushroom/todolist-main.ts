import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme"
import { Header } from "common/components"
import { Main } from "./Main"
import { useAppSelector } from "common/hooks"
import { RootState } from "./store"

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

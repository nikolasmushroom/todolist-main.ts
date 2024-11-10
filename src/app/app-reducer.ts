import {ActionsType} from "../model/tasks-reducer";

type initialStateType = typeof initialState
export type ThemeMode = 'dark' | 'light'
const initialState = {
    themeMode: 'light' as ThemeMode
}
export const appReducer = (state: initialStateType = initialState, action : ActionsType): initialStateType => {
    switch (action.type) {
        case 'CHANGE-THEME-MODE' :
            return {...state, themeMode: action.themeMode}
        default:
            return state
    }
}
export const changeThemeModeAC = (themeMode : ThemeMode) => {
    return {
        type: 'CHANGE-THEME-MODE',
        themeMode: themeMode
    } as const
}
export type changeThemeModeActionType = ReturnType<typeof changeThemeModeAC>
import { combineReducers, legacy_createStore, applyMiddleware} from 'redux'
import { tasksReducer } from '../model/tasks-reducer'
import { todolistsReducer } from '../model/todolists-reducer'
import {appReducer} from "./app-reducer";
import {thunk} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
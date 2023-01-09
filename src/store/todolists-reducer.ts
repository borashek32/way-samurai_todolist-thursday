export const REMOVE_TODOLIST = "REMOVE-TODOLIST" as const
export const ADD_TODOLIST = "ADD-TODOLIST" as const
export const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE" as const
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER" as const

import {FilterValuesType, TodoListType} from '../App'
import {v1} from "uuid";

type RemoveTodoListAT = {
  type: typeof REMOVE_TODOLIST
  id: string
}
type AddTodoListAT = {
  type: typeof ADD_TODOLIST
  title: string
}
type ChangeTodoListTitleAT = {
  type: typeof CHANGE_TODOLIST_TITLE
  title: string
  id: string
}
type ChangeTodoListFilterAT = {
  type: typeof CHANGE_TODOLIST_FILTER
  id: string
  filter: FilterValuesType
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return todoLists.filter(tl => tl.id === action.id)
    case "ADD-TODOLIST":
      const newTodoList: TodoListType = {
        id: v1(),
        title: action.title,
        filter: "all"
      }
      return [...todoLists, newTodoList]

    case "CHANGE-TODOLIST-TITLE":
      return todoLists.map(tl => tl.id === action.id
        ? {...tl, title: action.title}
        : tl)
    case "CHANGE-TODOLIST-FILTER":
      return todoLists.map(tl => tl.id === action.id
        ? {...tl, filter: action.filter}
        : tl)
    default:
      return todoLists
  }
}
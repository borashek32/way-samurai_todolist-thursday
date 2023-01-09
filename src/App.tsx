import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid} from "@mui/material";


//C - create (validation)
//R - read (pagination, sorting, filtration)
//U - update (validation)
//D - delete (validation)

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [todoListId: string]: Array<TaskType> // [id_1]: [{}, {}, {}]
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {


  // business logic
  const id_1 = v1()
  const id_2 = v1()
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: id_1, title: "What to learn", filter: "all"},
    {id: id_2, title: "What to buy", filter: "all"}
  ])
  const [tasks, setTasks] = useState<TasksStateType>({
    [id_1]: [
      {id: v1(), title: "HTML & CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false}
    ],
    [id_2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Meat", isDone: true},
      {id: v1(), title: "Wheat", isDone: false}
    ]
  })

  const removeTask = (taskId: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)
    })
  }
  const addTask = (title: string, todoListId: string) => {
    const tasksForUpdate: Array<TaskType> = tasks[todoListId]
    const newTask: TaskType = {id: v1(), title: title, isDone: false}
    setTasks({...tasks, [todoListId]: [newTask, ...tasksForUpdate]})
  }
  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
    })
  }
  const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: title} : t)
    })
  }

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    delete tasks[todoListId]
  }
  const addTodoList = (title: string) => {
    const newTodoListId = v1()
    const newTodoList: TodoListType = {
      id: newTodoListId,
      title: title,
      filter: "all"
    }
    setTodoLists([...todoLists, newTodoList])
    setTasks({...tasks, [newTodoListId]: []})
  }
  const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl))
  }
  const changeTodoListTitle = (title: string, todoListId: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
  }
  const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
    switch (filter) {
      case "completed":
        return tasks.filter(task => task.isDone)
      case "active":
        return tasks.filter(task => !task.isDone)
      default:
        return tasks
    }
  }

  const todoListComponents = todoLists.map((tl) => {
    const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)

    return (
      <TodoList
        key={tl.id}
        todoListId={tl.id}
        removeTodoList={removeTodoList}
        tasks={filteredTasks}
        title={tl.title}
        filter={tl.filter}
        addTask={addTask}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTodoListFilter={changeTodoListFilter}
        changeTaskTitle={changeTaskTitle}
        changeTodoListTitle={changeTodoListTitle}
      />
    )
  })

  return (
    <div>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              TodoLists
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <div className="App">
          <div style={{marginTop: "5px", marginBottom: "60px"}}>
            <h3>Add a new TodoList</h3>
            <AddItemForm addItem={addTodoList}/>
          </div>
          <Grid container spacing={2} style={{gap: "50px"}}>
            {todoListComponents}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default App;

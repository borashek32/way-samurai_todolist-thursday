import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, Grid, IconButton, List, ListItem, Paper, styled} from "@mui/material";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (title: string, todoListId: string) => void
  removeTask: (taskId: string, todoListId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  changeTodoListFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
  removeTodoList: (todoListId: string) => void
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
  changeTodoListTitle: (todoListId: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
  const tasksListItems = props.tasks.length
    ? <List>{
      props.tasks.map((task) => {
        const removeTask = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
          props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListId)

        return (
          <ListItem
            key={task.id}
            sx={{p: "0"}}
          >
            <Checkbox
              size="small"
              checked={task.isDone}
              onChange={changeTaskStatus}
            />
            <div
              style={{display: "inline-block"}}
              className={task.isDone ? "task-done" : ""}
            >
              <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
            </div>
            <IconButton onClick={removeTask}>
              <CancelPresentationIcon fontSize="small" />
            </IconButton>
          </ListItem>
        )
      })}</List>
    : <span>List is empty</span>

  const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

  const removeTodoList = () => props.removeTodoList(props.todoListId)

  const addNewTask = (title: string) => {
    if (title) {
      props.addTask(title, props.todoListId)
    }
  }

  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid style={{display: "flex", flexDirection: "column"}}>
      <Item style={{boxShadow:  "0px 0px 20px #1A2027"}}>
        <h3>
          <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
          <IconButton onClick={removeTodoList}>
            <CancelPresentationIcon />
          </IconButton>
        </h3>
        <AddItemForm
          addItem={addNewTask}
        />
        {tasksListItems}
        <div>
          <Button
            sx={{mr: "5px", p: "2px 2px", fontSize: "12px"}}
            disableElevation
            variant="contained"
            size="small"
            color={props.filter === "all" ? "secondary" : "primary"}
            // className={props.filter === "all" ? "btn-active" : ""}
            onClick={onClickHandlerCreator("all")}
          >
            All
          </Button>
          <Button
            sx={{mr: "5px", p: "2px 2px", fontSize: "12px"}}
            disableElevation
            variant="contained"
            size="small"
            color={props.filter === "active" ? "secondary" : "primary"}
            // className={props.filter === "active" ? "btn-active" : ""}
            onClick={onClickHandlerCreator("active")}
          >
            Active
          </Button>
          <Button
            sx={{mr: "5px", p: "2px 2px", fontSize: "12px"}}
            disableElevation
            variant="contained"
            size="small"
            color={props.filter === "completed" ? "secondary" : "primary"}
            // className={props.filter === "completed" ? "btn-active" : ""}
            onClick={onClickHandlerCreator("completed")}
          >
            Completed
          </Button>
        </div>
      </Item>
    </Grid>
  );
};

export default TodoList;
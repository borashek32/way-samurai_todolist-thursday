import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

type AddItemFormType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }

  // const errorStyles = {fontWeight: "bold", color: "red"}
  // const errorMessage = error
  //   ? <div style={errorStyles}>Please, enter title</div>
  //   : null

  const onEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItem()
    }
  }

  const addItem = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addItem(title)
    } else {
      setError(true)
    }
    setTitle("")
  }

  return (
    <div>
      <TextField
        size="small"
        rows="1"
        margin="none"
        value={title}
        onKeyDown={onEnterAddItem}
        onChange={setLocalTitle}
        className={error ? "input-error" : ""}
        label="Title"
        helperText={error && "Enter new title"}
      />
      <Button onClick={addItem}>
        <PlaylistAddIcon />
      </Button>
      {/*{errorMessage}*/}
    </div>
  )
}
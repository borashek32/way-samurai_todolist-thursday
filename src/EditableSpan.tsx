import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {OutlinedInput} from "@mui/material";

type EditableSpanType = {
  title: string
  changeTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanType) => {
  const [isEditMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")

  const onEditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && offEditMode()
  }

  const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    isEditMode
      ? <OutlinedInput
        value={title}
        onChange={setLocalTitle}
        autoFocus
        onBlur={offEditMode}
        onKeyDown={onKeyDownOffEditMode}

      />
      : <span
        onDoubleClick={onEditMode}
      >
        {props.title}
    </span>
  );
};

export default EditableSpan;

// rsc
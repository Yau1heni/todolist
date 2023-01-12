import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

const EditableSpan: React.FC<EditableSpanPropsType> = ({ title, changeTitle }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newTitle, setTitle] = useState(title);

  const onEditMode = () => {
    setIsEditMode(true);
  };
  const offEditMode = () => {
    setIsEditMode(false);
    changeTitle(newTitle);
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return isEditMode ? (
    <input value={newTitle} autoFocus onBlur={offEditMode} onChange={onChangeEditHandler} />
  ) : (
    <span onDoubleClick={onEditMode}>{title}</span>
  );
};

export default EditableSpan;

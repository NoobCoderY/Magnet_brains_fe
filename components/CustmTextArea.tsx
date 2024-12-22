import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { TodoInterface } from "@/utils/compareDate";

type ChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

interface TodoFormProps {
  todoCreate: TodoInterface;
  handleChange: ChangeHandler;
}

// for avoid recreation of component definition every time user type

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  background:#FFDDD2 ;
  border: 1px solid #006D77 ;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &:hover {
    border-color:#006D77;
    border: 2px solid #006D77 ;
  }
  &:focus {
    border-color:#006D77;
  }
  // firefox
  &:focus-visible {
    outline: 0;
  }
  &::-webkit-scrollbar {
      width: 4px; /* Adjust the width as needed */
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
`
);

const MaxHeightTextarea=({todoCreate,handleChange}:TodoFormProps)=> {

  return (
    <div>
       <StyledTextarea
      maxRows={7}
      minRows={4}
      aria-label="maximum height"
      placeholder="Enter task Description"
      value={todoCreate.description}
      onChange={handleChange}
      name="description"
    />
    </div>
  );
}

export default MaxHeightTextarea

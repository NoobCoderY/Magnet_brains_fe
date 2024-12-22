import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { TodoInterface } from "@/utils/compareDate";
import dayjs from "dayjs";

// custom datepicker
const CustomDateField = styled(DatePicker)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#006D77",
    },
    
  },
  "MuiPickersPopper-root": {
      top:"-40px"
  }
});

interface TodoFormProps {
  settodoCreate: React.Dispatch<React.SetStateAction<TodoInterface>>;
  todoCreate: TodoInterface;
}

export default function DateFieldValue({
  settodoCreate,
  todoCreate,
}: TodoFormProps) {
  
  const [value, setValue] = React.useState<Date | null | any>(null);
  
  // for handle unsynchronous behaviour of useState
  const waitDateChange = (newValue: any) => {
    return new Promise<void>((resolve, reject) => {
      setValue(newValue);
      resolve();
    });
  };

  
  React.useEffect(() => {
    const inputDateString = `${value}`;
    // Create a Date object from the input string
    const date = new Date(inputDateString);
    // Extract month, day, and year
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const day = date.getDate();
    const year = date.getFullYear();
    // Create the formatted date string in "mm/dd/yyyy" format
    const formattedDate = `${month}/${day}/${year}`;  
    settodoCreate({
      ...todoCreate,
      dueDate: formattedDate,
    });
  }, [value]);

//for prefill date value in edit component
  React.useEffect(() => { 
    setValue((dayjs(todoCreate.dueDate)))
  },[todoCreate.dueDate])

  const handleDate = async (newValue: any) => {
    await waitDateChange(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDateField
        value={value}
        onChange={(newValue: any) => {
          handleDate(newValue);
        }}
        className="w-full"
        label="Enter date"
      />
    </LocalizationProvider>
  );
}

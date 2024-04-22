import { Box, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addMonths } from 'date-fns/addMonths';
import { ja } from "date-fns/locale"
import React from 'react'

interface MonthSelectorProps{
  currentMonth: Date,
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
}

const MonthSelector = ({ currentMonth, setCurrentMonth }: MonthSelectorProps) => {
  
  const handlePreviousMonth = () => {
    const preciousMonth = addMonths(currentMonth, -1)
    setCurrentMonth(preciousMonth)
  }

  const handleNestMonth = () => { 
    const nextMonth = addMonths(currentMonth, 1)
    setCurrentMonth(nextMonth)
  }

  const handleDateChange = (newDate:Date | null) => {
    // console.log(newDate)
    if (newDate) {
      setCurrentMonth(newDate)
    }
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
    >
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Button onClick={handlePreviousMonth} color={"error"} variant={"contained"}>先月</Button>
      <DatePicker
        onChange={handleDateChange}
        label="年月を選択"
        sx={{ mx: 2, background: "white" }}
        views={["year", "month"]}
        format="yyyy/MM"
        slotProps={{ toolbar: { toolbarFormat: "yyyy年MM月" } }}
        value={currentMonth}
      />
      <Button onClick={handleNestMonth} color={"primary"} variant={"contained"}>次月</Button>
    </Box>
    </LocalizationProvider>
  )
}

export default MonthSelector
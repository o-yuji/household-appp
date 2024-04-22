import { Grid, Paper } from '@mui/material'
import React from 'react'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'
import { Transaction } from '../types'
// import { Typography } from '@mui/material'

interface ReportProps {
  currentMonth: Date,
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
  monthlyTransactions: Transaction[],
  isLoading: boolean,
}

const Report = ({currentMonth, setCurrentMonth, monthlyTransactions, isLoading}:ReportProps) => {
  const commonPaperStyle = {
    height: { sx: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
    p:2,
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}>
          <CategoryChart monthlyTransactions={monthlyTransactions} isLoading={isLoading} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          <BarChart monthlyTransactions={monthlyTransactions} isLoading={isLoading} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TransactionTable monthlyTransactions={monthlyTransactions} />
      </Grid>
    </Grid>
  )
}

export default Report
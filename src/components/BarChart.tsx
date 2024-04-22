import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Transaction } from '../types';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

interface BarChartProps{
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const BarChart = ({ monthlyTransactions, isLoading }: BarChartProps) => {
  const theme = useTheme()
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      //デフォルトでtop表示になるため不要
      // legend: {
      //   position: 'top' as const,  left right...
      // },
      title: {
        display: true,
        text: '日別収支',
      },
    },
  };

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  const dateLabels = Object.keys(dailyBalances).sort()
  
  const expanseData = dateLabels.map((day) => dailyBalances[day].expense)
  const incomeData = dateLabels.map((day) => dailyBalances[day].income)

    const data:ChartData<"bar"> = {
    labels: dateLabels,
    datasets: [
      {
        label: '支出',
        data: expanseData,
        backgroundColor: theme.palette.expenseColor.light,
      },
      {
        label: '収入',
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };

  return (
    <Box sx={{flexGrow:1}}>
        {isLoading?(
          <CircularProgress />
        ) : monthlyTransactions.length > 0 ? (
          <Bar options={options} data={data} />
        ) : (
            <Typography>データがありません</Typography>
        )}
    </Box>
  )
}

export default BarChart
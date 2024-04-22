import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calendar.css'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, Transaction,CalendarContent } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from '@mui/material'
import { isSameMonth } from 'date-fns'

interface calendarProps{
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
  currentDay: string,
  today:string,
}

const Calendar = ({ monthlyTransactions, setCurrentMonth, setCurrentDay, currentDay, today}: calendarProps) => {
  const theme = useTheme()
  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  // console.log(dailyBalances)

  const backgroundEvent = {
    start: currentDay,
    display: 'background',
    backgroundColor: theme.palette.incomeColor.light,
  }

  //カレンダー表示の関数
  const createCalendarEvents = (dailyBalances: Record<string, Balance>):CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances)
  // console.log([...calendarEvents,backgroundEvent])

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  //月と日付を選択したときの処理
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart
    setCurrentMonth(currentMonth)
    const todayDate = new Date()
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today)
    }
  }

  //日付を選択したときの処理
  const handleDateClick = (dateInfo: DateClickArg) => {
    // console.log(dateInfo)
    setCurrentDay(dateInfo.dateStr)
  }

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={[...calendarEvents,backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  )
}

export default Calendar
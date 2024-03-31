import { useEffect, useState } from "react";

function Calendar({
  first,
  setCheckInDate,
  setCheckOutDate,
  setErrors,
  checkOutDate,
  checkInDate,
  bookedDatesArr,
  firstSelectedMonth,
  setFirstSelectedMonth,
  lastSelectedMonth,
  setLastSelectedMonth,
  firstSelectedDate,
  setFirstSelectedDate,
  lastSelectedDate,
  setLastSelectedDate,
  syncForward,
  setSyncForward,
  syncBackward,
  setSyncBackward,
}) {
  const [date, setDate] = useState(
    new Date(
      new Date().getFullYear(),
      first ? new Date().getMonth() : new Date().getMonth() + 1,
      first ? new Date().getDate() : 1,
    ),
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    first ? new Date().getMonth() : new Date().getMonth() + 1,
  );
  const [monthName, setMonthName] = useState(
    date.toLocaleString("default", { month: "long" }),
  );
  const [days, setDays] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState();
  const [firstDayOfWeekArr, setFirstDayOfWeekArr] = useState([]);
  const [lastDay, setLastDay] = useState(0);
  const [bookedDates, setBookedDates] = useState("");

  useEffect(() => {
    clearCalendar();
    date.setDate(1);
    setFirstDayOfWeek(date.getDay());
    setFirstDayOfWeekArr([]);
    for (let i = 1; i <= firstDayOfWeek; i += 1) {
      setFirstDayOfWeekArr((prevState) => {
        return [...prevState, i];
      });
      if (i === 7) {
        setFirstDayOfWeekArr([]);
      }
    }
    date.setMonth(date.getMonth() + 1);
    date.setDate(-1);
    setLastDay(date.getDate() + 1);
    setDays([]);
    for (let i = 1; i <= lastDay; i += 1) {
      setDays((prevState) => {
        return [...prevState, i];
      });
    }
    setYear(date.getFullYear());
  }, [lastDay, date]);

  const selectDate = (e) => {
    const selectedDate = parseInt(e.target.innerText);
    if (!firstSelectedDate && checkDateRange(selectedDate)) {
      setFirstSelectedDate(selectedDate);
      setFirstSelectedMonth(month);
    } else if (checkDateRange(selectedDate)) {
      setLastSelectedDate(selectedDate);
      setLastSelectedMonth(month);
    }
  };

  const checkDateRange = (selectedDate) => {
    for (let i = parseInt(firstSelectedDate); i < selectedDate; i += 1) {
      if (bookedDates.includes(i)) {
        return false;
      }
    }
    if (
      !checkForPastDate(selectedDate) ||
      bookedDates.includes(selectedDate) ||
      (bookedDates.includes(selectedDate + 1) && !firstSelectedDate)
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log(firstSelectedMonth);
    let tempCheckIn;
    let tempCheckOut;
    let tempFirstMonth = firstSelectedMonth.toString();
    let tempLastMonth = lastSelectedMonth.toString();
    if (tempFirstMonth.length === 1) {
      tempFirstMonth = "0" + (firstSelectedMonth + 1);
    } else {
      tempFirstMonth = firstSelectedMonth + 1;
    }
    if (tempLastMonth.length === 1) {
      tempLastMonth = "0" + (lastSelectedMonth + 1);
    } else {
      tempLastMonth = lastSelectedMonth + 1;
    }
    if (firstSelectedDate < 10) {
      tempCheckIn = "0" + firstSelectedDate;
    } else {
      tempCheckIn = firstSelectedDate;
    }
    if (lastSelectedDate < 10) {
      tempCheckOut = "0" + lastSelectedDate;
    } else {
      tempCheckOut = lastSelectedDate;
    }
    tempCheckIn = `${year}-${tempFirstMonth}-${tempCheckIn}`;
    tempCheckOut = `${year}-${tempLastMonth}-${tempCheckOut}`;
    console.log(tempCheckIn);
    console.log(tempCheckOut);

    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckIn)) {
      setCheckInDate(tempCheckIn);
    }
    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckOut)) {
      setCheckOutDate(tempCheckOut);
      setErrors(false);
    }
    let bookedDates = [];
    bookedDatesArr
      .filter((dateRange) => {
        return dateRange[0].month === month || dateRange[1].month === month;
      })
      .forEach((dateRange) => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });
    setBookedDates(bookedDates);
  }, [firstSelectedDate, lastSelectedDate, month, year]);

  useEffect(() => {
    if (checkOutDate) {
      setLastSelectedDate(checkOutDate.slice(8, 10));
    }
    if (checkInDate) {
      setFirstSelectedDate(checkInDate.slice(8, 10));
    }
  }, [checkOutDate, checkInDate]);

  const nextMonth = () => {
    date.setDate(1);
    setMonth((prevState) => prevState + 1);
    date.setMonth(month + 1);
    setMonthName(date.toLocaleString("default", { month: "long" }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
    if (!first) {
      setSyncForward(true);
    }
  };

  const prevMonth = () => {
    date.setDate(1);
    setMonth((prevState) => prevState - 1);
    date.setMonth(month - 1);
    setMonthName(date.toLocaleString("default", { month: "long" }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
    if (first) {
      setSyncBackward(true);
    }
  };

  useEffect(() => {
    if (syncForward && first) {
      setSyncForward(false);
      nextMonth();
    }
    if (syncBackward && !first) {
      setSyncBackward(false);
      prevMonth();
    }
  }, [syncForward, syncBackward]);

  const clearCalendar = () => {
    setFirstSelectedDate("");
    setLastSelectedDate("");
    setCheckInDate("");
    setCheckOutDate("");
    setFirstSelectedMonth(Infinity);
    setLastSelectedMonth(Infinity);
  };

  const checkForPastDate = (day) => {
    const today = new Date();

    if (date.getFullYear() > today.getFullYear()) {
      return true;
    } else if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() > today.getMonth()
    ) {
      return true;
    } else if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      day >= today.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const calendarDays = () => {
    let bookedDates = [];
    bookedDatesArr
      .filter((dateRange) => {
        return dateRange[0].month === month || dateRange[1].month === month;
      })
      .forEach((dateRange) => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });

    return days.map((day) => {
      const inDate = new Date(year, firstSelectedMonth, firstSelectedDate);
      const outDate = new Date(year, lastSelectedMonth, lastSelectedDate);
      const calendarDate = new Date(year, month, day);
      let element;
      if (
        inDate < calendarDate &&
        outDate > calendarDate &&
        firstSelectedMonth !== Infinity &&
        lastSelectedMonth !== Infinity
      ) {
        element = (
          <div key={day} className="active-backing">
            <div className="active-date clickable-date" onClick={selectDate}>
              {day}
            </div>
          </div>
        );
      } else if (inDate.toString() === calendarDate.toString()) {
        element = (
          <div key={day} className="first-backing">
            <div className="first-date" onClick={selectDate}>
              {day}
            </div>
          </div>
        );
      } else if (outDate.toString() === calendarDate.toString()) {
        element = (
          <div key={day} className="last-backing">
            <div className="last-date" onClick={selectDate}>
              {day}
            </div>
          </div>
        );
      } else if (bookedDates.includes(day)) {
        element = (
          <div key={day} className="booked-date">
            {day}
          </div>
        );
      } else if (bookedDates.includes(day + 1) && !firstSelectedDate) {
        element = (
          <div key={day} className="checkout-only-date">
            {day}
          </div>
        );
      } else if (checkForPastDate(day)) {
        element = (
          <div
            key={day}
            onClick={
              !firstSelectedDate || inDate < calendarDate ? selectDate : null
            }
            className={
              !firstSelectedDate || inDate < calendarDate
                ? "clickable-date"
                : "date"
            }
          >
            {day}
          </div>
        );
      } else {
        element = (
          <div key={day} onClick={selectDate} className="expired-date">
            {day}
          </div>
        );
      }
      return element;
    });
  };

  return (
    <div className="calendar">
      <div className="month">
        <div className="month-header">
          {first ? (
            <span className="prev" onClick={prevMonth}>
              {"<"}
            </span>
          ) : (
            <span className="next" onClick={nextMonth}>
              {">"}
            </span>
          )}
          <div>
            <span>
              {monthName} {year}
            </span>
          </div>
        </div>
      </div>

      <div className="weekdays">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      <div className="days">
        {firstDayOfWeekArr.map((day) => {
          return <div key={day}></div>;
        })}
        {calendarDays()}
      </div>
      <div onClick={clearCalendar} className="clickable-date-clear">
        CLEAR CALENDAR
      </div>
    </div>
  );
}

export default Calendar;

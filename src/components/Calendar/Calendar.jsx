// Calendar.js
import { useState } from "react";
import getWeeksInMonth from "../../utils/dateUtils";
import moment from "moment";
import styles from "./Calendar.module.scss";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const today = moment();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // console.log("startDate", startDate);
  // console.log("endDate", endDate);

  const prevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
    setStartDate(null);
    setEndDate(null);
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
    setStartDate(null);
    setEndDate(null);
  };

  const weekContentList = getWeeksInMonth(currentMonth);

  const handleDateClick = (dayData) => {
    if (!startDate || endDate) {
      // Set as start date if no start date or end date is set
      setStartDate(dayData.date);
      setEndDate(null);
    } else {
      // Set as end date
      setEndDate(dayData.date);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      {/* calendar header */}
      <div className={styles.calendarHeader}>
        <button onClick={prevMonth} className={styles.monthSelect}>
          {"<"}
        </button>
        <div>
          <span>{currentMonth.format("YYYY")}年</span>
          <span>{currentMonth.format("MM")}月</span>
        </div>
        <button onClick={nextMonth} className={styles.monthSelect}>
          {">"}
        </button>
      </div>
      {/* calendar body */}
      <div className={styles.calendarBody}>
        {weekContentList.map((week, wIdx) => {
          let aWeek = [];
          week.map((dayData, dIdx) => {
            const isToday =
              dayData.isCurrentMonth &&
              currentMonth.format("YYYY") === today.format("YYYY") &&
              currentMonth.format("MM") === today.format("MM") &&
              moment(dayData.date, "DD").isSame(today, "day");
            const isInRange =
              startDate &&
              endDate &&
              moment(dayData.date).isBetween(startDate, endDate, null, "[]");
            const isStartDate = startDate && dayData.date === startDate;

            aWeek.push(
              <span
                className={`${styles.dayButtons} ${
                  dayData.isCurrentMonth
                    ? styles.currentMonth
                    : styles.nonCurrentMonth
                } ${isToday && dayData.isCurrentMonth ? styles.today : ""}
                  ${
                    dayData.isCurrentMonth && isInRange
                      ? styles.selectedDate
                      : ""
                  } ${
                  dayData.isCurrentMonth && isStartDate ? styles.startDate : ""
                }`}
                key={`${dayData.date}-${dIdx}`}
                onClick={() => handleDateClick(dayData)}
              >
                {dayData.date === 0 ? "" : dayData.date + "日"}
              </span>
            );
          });
          return (
            <div className={styles.aweek} key={`${week}-${wIdx}`}>
              {aWeek}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;

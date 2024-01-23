// Calendar.js
import { useState } from "react";
import getWeeksInMonth from "../../utils/dateUtils";
import moment from "moment";
import styles from "./Calendar.module.scss";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const prevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const weekContentList = getWeeksInMonth(currentMonth);

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
          week.map((dayData, dIdx) =>
            aWeek.push(
              <span
                className={`${styles.dayButtons} ${
                  dayData.isCurrentMonth
                    ? styles.currentMonth
                    : styles.nonCurrentMonth
                }`}
                key={`${dayData.date}-${dIdx}`}
              >
                {dayData.date === 0 ? "" : dayData.date + "日"}
              </span>
            )
          );
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

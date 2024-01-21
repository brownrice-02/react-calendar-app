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
  let result = [];

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
          week.map((day, dIdx) =>
            aWeek.push(
              <span className={styles.dayButtons} key={`${day}-${dIdx}`}>
                {day === 0 ? "" : day + "日"}
              </span>
            )
          );
          result.push(
            <div className={styles.aweek} key={`${week}-${wIdx}`}>
              {aWeek}
            </div>
          );
        })}
        {result}
      </div>
    </div>
  );
};
export default Calendar;

// Calendar.js
import getWeeksInMonth from "../../utils/dateUtils";
import moment from "moment";
import styles from "./Calendar.module.scss";

const Calendar = () => {
  let weekContentList = getWeeksInMonth();
  let result = [];

  const prevMonth = () => {
    // 實現上一月邏輯
    // ...
  };

  const nextMonth = () => {
    // 實現下一月邏輯
    // ...
  };

  return (
    <div className={styles.calendarContainer}>
      {/* calendar header */}
      <div className={styles.calendarHeader}>
        <button onClick={prevMonth} className={styles.monthSelect}>
          {"<"}
        </button>
        <div>
          <span>{moment().format("YYYY")}年</span>
          <span>{moment().format("MM")}月</span>
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
                {day === 0 ? "" : day}
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

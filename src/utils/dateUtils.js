// utils.js
// GLobal Vars
const SEVENDAYS = 7; // 建立一個通用變數，存放一週有7天

function processWeekDays(mmt, isFirstWeek = false) {
  // get first day of a week, ex: Thursday
  const totalDays = mmt.daysInMonth();
  const startDay = isFirstWeek ? mmt.startOf("month").day() : 0;

  const weekDays = [];
  let isFinished = false;

  // Fill the dates from the previous month for the first week
  if (isFirstWeek) {
    const lastMonth = mmt.clone().subtract(1, "month");
    for (let i = 0; i < startDay; i++) {
      const currentDate = lastMonth.endOf("month").date() - startDay + i + 1;
      weekDays.push({ date: currentDate, isCurrentMonth: false });
    }
  }

  for (let d = startDay; d < SEVENDAYS; d++) {
    const currentDate = mmt.date();
    const isCurrentMonth = mmt.isSame(mmt, "month");

    weekDays.push({ date: currentDate, isCurrentMonth });

    if (currentDate !== totalDays) mmt.add(1, "day");
    else {
      isFinished = true;
      break;
    }
  }

  // Fill the dates from the next month for the last week
  if (isFinished) {
    const remainingDays = SEVENDAYS - weekDays.length;

    for (let i = 0; i < remainingDays; i++) {
      const currentDate = i + 1;
      weekDays.push({ date: currentDate, isCurrentMonth: false });
    }
}


  // console.log("weekDays", weekDays);
  return { weekDays, isFinished };
}

export default function getWeeksInMonth(mmt) {
  const weekDayList = [];

  // first weekDays
  const { weekDays } = processWeekDays(mmt, true);
  weekDayList.push(weekDays);

  let loopStatus = false;
  // create
  while (!loopStatus) {
    let result = processWeekDays(mmt);
    const { weekDays } = result;
    weekDayList.push(weekDays);

    loopStatus = result["isFinished"];
  }

  // console.log("weekDayList", weekDayList);
  return weekDayList;
}

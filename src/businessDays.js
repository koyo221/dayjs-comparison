const dayjs = require("dayjs");

const getRemainingBusinessDaysDayjs = (date) => {
  const startDate = dayjs(date);
  const endDate = dayjs(date).endOf("year");
  const totalDays = endDate.diff(startDate, "day") + 1;

  return new Array(totalDays)
    .fill()
    .map((_, index) => startDate.add(index, "day"))
    .filter((date) => {
      const dayOfWeek = date.day();
      return dayOfWeek !== 0 && dayOfWeek !== 6;
    }).length;
};

const getRemainingBusinessDaysDate = (date) => {
  const startDate = new Date(date);
  const endDate = new Date(startDate.getFullYear(), 11, 31);
  const totalDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return Array.from({ length: totalDays })
    .map((_, index) => {
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + index
      );
    })
    .filter((date) => {
      const dayOfWeek = date.getDay();
      return dayOfWeek !== 0 && dayOfWeek !== 6;
    }).length;
};

console.log(getRemainingBusinessDaysDayjs("2000-06-01"));
console.log(getRemainingBusinessDaysDate("2000-06-01"));

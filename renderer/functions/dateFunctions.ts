export const isDifferentDay = (currentTimestamp: number, prevTimeStamp: number) => {
  const currentDate = new Date(currentTimestamp);
  const prevDate = new Date(prevTimeStamp);
  if (currentDate.toDateString() !== prevDate.toDateString()) return true;
  else return false;
};

export const getFullDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${week[date.getDay()]}요일`;
};

export const getTime = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const resultHour = hour < 10 ? "0" + hour : hour.toString();
  const resultMinute = minute < 10 ? "0" + minute : minute.toString();
  return resultHour + ":" + resultMinute;
};

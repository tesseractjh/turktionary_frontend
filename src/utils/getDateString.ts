const getDateString = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const second = dateObj.getSeconds();
  const dateString = `${year}년 ${month}월 ${day}일 ${hour
    .toString()
    .padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second
    .toString()
    .padStart(2, '0')}`;

  return { year, month, day, hour, minute, second, dateString };
};

export default getDateString;

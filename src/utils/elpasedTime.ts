const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const elpasedTime = (date: Date | string) => {
  const time = (typeof date === 'string' ? new Date(date) : date).getTime();
  const now = Date.now();
  const diff = Math.floor((now - time) / 1000);
  if (diff < 5) {
    return '방금 전';
  } else if (diff < MINUTE) {
    return `${diff}초 전`;
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}분 전`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}시간 전`;
  } else if (diff < WEEK) {
    return `${Math.floor(diff / DAY)}일 전`;
  } else if (diff < MONTH) {
    return `${Math.floor(diff / WEEK)}주 전`;
  } else if (diff < YEAR) {
    return `${Math.floor(diff / MONTH)}개월 전`;
  }
  return `${Math.floor(diff / YEAR)}년 전`;
};

export default elpasedTime;

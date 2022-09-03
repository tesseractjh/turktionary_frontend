import { SetterOrUpdater } from 'recoil';

const debounce = (
  timerId: number,
  setTimerId: SetterOrUpdater<number>,
  callback: () => void,
  delay: number
) => {
  return () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setTimerId(setTimeout(callback, delay) as unknown as number);
  };
};

export default debounce;

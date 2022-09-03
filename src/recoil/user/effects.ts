import { AtomEffect } from 'recoil';

export const clearTimerEffects: AtomEffect<NodeJS.Timeout> = ({ onSet }) => {
  onSet((_, prevTimerId) => {
    clearTimeout(prevTimerId as NodeJS.Timeout);
  });
};

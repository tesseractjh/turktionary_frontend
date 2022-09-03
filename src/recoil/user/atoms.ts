import { atom } from 'recoil';
import { clearTimerEffects } from './effects';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: ''
});

export const accessTokenTimerIdState = atom<NodeJS.Timeout>({
  key: 'accessTokenTimerIdState',
  effects: [clearTimerEffects]
});

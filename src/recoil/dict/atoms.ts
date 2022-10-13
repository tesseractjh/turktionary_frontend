import { atomFamily } from 'recoil';

export const dictFormState = atomFamily<any, string>({
  key: 'dictFormState',
  default: ''
});

export const dictFormPrevState = atomFamily<any, string>({
  key: 'dictFormPrevState',
  default: ''
});

export const dictFormListState = atomFamily<any[], string>({
  key: 'dictFormListState',
  default: []
});

export const dictFormTimerIdState = atomFamily<number, string>({
  key: 'dictFormTimerIdState',
  default: 0
});

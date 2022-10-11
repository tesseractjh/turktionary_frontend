import { atomFamily } from 'recoil';

export const dictFormState = atomFamily<string, string>({
  key: 'dictFormState',
  default: ''
});

export const dictFormPrevState = atomFamily<string, string>({
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

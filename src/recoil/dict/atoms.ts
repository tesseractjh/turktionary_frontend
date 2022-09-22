import { atomFamily } from 'recoil';

export const dictFormState = atomFamily<string, string>({
  key: 'dictFormState',
  default: ''
});

export const dictFormPrevState = atomFamily<string, string>({
  key: 'dictFormPrevState',
  default: ''
});

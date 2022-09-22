import { atomFamily } from 'recoil';

export const dictFormState = atomFamily<string, string>({
  key: 'dictFormState',
  default: ''
});

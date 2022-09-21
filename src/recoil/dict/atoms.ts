import { atomFamily } from 'recoil';

export const dictFormState = atomFamily<string, string>({
  key: 'dictFormState',
  default: '',
  effects: (param) => [
    ({ onSet }) => onSet((value) => console.log(param, value))
  ]
});

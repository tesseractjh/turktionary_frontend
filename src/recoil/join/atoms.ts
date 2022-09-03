import { atom, atomFamily } from 'recoil';

export const joinTextState = atomFamily<string, string>({
  key: 'joinTextState',
  default: ''
});

export const joinTextValidationState = atomFamily<boolean, string>({
  key: 'joinTextValidationState',
  default: false
});

export const joinCheckboxState = atomFamily<boolean, string>({
  key: 'joinCheckboxState',
  default: false
});

export const joinInputTimerId = atom({
  key: 'joinInputTimerId',
  default: 1
});

export const joinResultState = atom({
  key: 'joinResultState',
  default: false
});

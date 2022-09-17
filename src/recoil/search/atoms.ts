import { atom } from 'recoil';

export const searchInputState = atom({
  key: 'searchInputState',
  default: ''
});

export const searchBarPositionState = atom({
  key: 'searchBarPositionState',
  default: 'content'
});

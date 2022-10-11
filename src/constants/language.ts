const LANG = {
  ALL: {
    id: 'all',
    name: '튀르크어'
  },
  TR: {
    id: 'turkish',
    name: '터키어'
  },
  AZ: {
    id: 'azerbaijani',
    name: '아제르바이잔어'
  },
  UZ: {
    id: 'uzbek',
    name: '우즈베크어'
  },
  KZ: {
    id: 'kazakh',
    name: '카자흐어'
  },
  TM: {
    id: 'turkmen',
    name: '투르크멘어'
  },
  KG: {
    id: 'kyrgyz',
    name: '키르기스어'
  }
};

export const LANG_LIST = Object.keys(LANG)
  .filter((key) => key !== 'ALL')
  .map((key) => LANG[key as keyof typeof LANG].name);

export const LANG_MAP = Object.keys(LANG)
  .filter((key) => key !== 'ALL')
  .reduce((acc, key) => {
    const { id, name } = LANG[key as keyof typeof LANG];
    acc[id] = { type: key as Exclude<DictionaryType, 'ALL'>, name };
    return acc;
  }, {} as Record<string, { type: Exclude<DictionaryType, 'ALL'>; name: string }>);

export default LANG;

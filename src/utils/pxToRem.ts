const ROOT_FONT_SIZE = 10;

const getNumFromStr = (str: string) => Number(str.replace(/[^0-9.-]+/g, ''));

const pxToRem = (...values: (number | string)[]): string => {
  return values
    .map((value) => {
      if (typeof value === 'number') {
        const rem = value / ROOT_FONT_SIZE;
        return rem && !Number.isNaN(rem) ? `${rem}rem` : '0';
      }
      if (value === 'auto') {
        return 'auto';
      }
      const rem = getNumFromStr(value) / ROOT_FONT_SIZE;
      return rem && !Number.isNaN(rem) ? `${rem}rem` : '0';
    })
    .join(' ');
};

export default pxToRem;

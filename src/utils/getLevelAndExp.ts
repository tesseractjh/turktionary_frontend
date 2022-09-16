export const expRequirement = [
  0, 100, 220, 364, 537, 745, 995, 1295, 1655, 2087, 2606, 3229, 3977, 4875,
  5953, 7247, 8800, 10664, 12901, 15586
];

const getLevelAndExp = (exp: number) => {
  let level = 1;
  while (level < 20) {
    if (exp < expRequirement[level]) {
      return [level, expRequirement[level - 1], expRequirement[level]];
    }
    level++;
  }
  return [20, expRequirement[19], expRequirement[20]];
};

export default getLevelAndExp;

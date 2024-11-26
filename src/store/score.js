import { atom } from "recoil";

export const userScoreEasyState = atom({
  key: "userScoreEasyState",
  default: 0,
});
export const userScoreMediumState = atom({
  key: "userScoreMediumState",
  default: 0,
});
export const userScoreHardState = atom({
  key: "userScoreHardState",
  default: 0,
});

export const highScoreState = atom({
  key: "highScoreState",
  default: 0,
});

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
export const userScoreExtremeState = atom({
  key: "userScoreExtremeState",
  default: 0,
});

export const easyHighScoreState = atom({
  key: "easyHighScoreState",
  default: 0,
});
export const mediumHighScoreState = atom({
  key: "mediumHighScoreState",
  default: 0,
});
export const hardHighScoreState = atom({
  key: "hardHighScoreState",
  default: 0,
});
export const extremeHighScoreState = atom({
  key: "extremeHighScoreState",
  default: 0,
});

export const highScoreState = atom({
  key: "highScoreState",
  default: 0,
});

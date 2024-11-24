import { atom } from "recoil";

export const userScoreState = atom({
  key: "userScoreState",
  default: 0,
});

export const highScoreState = atom({
  key: "highScoreState",
  default: 0,
});

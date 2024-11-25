import { atom } from "recoil";

export const gameLevelState = atom({
  key: "gameLevelState",
  default: 1, // 1 -> Easy, 2 -> Medium , 3 -> Hard
});

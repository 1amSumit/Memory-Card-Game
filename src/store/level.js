import { atom } from "recoil";

export const gameLevelState = atom({
  key: "gameLevelState",
  default: "easy", // easy,  medium ,  hard
});

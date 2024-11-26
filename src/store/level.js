import { atom } from "recoil";

export const gameLevelState = atom({
  key: "gameLevelState",
  default: "Easy", // Easy,  Medium ,  Hard
});

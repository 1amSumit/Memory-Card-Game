import { atom } from "recoil";

export const matchLevelState = atom({
  key: "matchLevelState",
  default: 1, // Initial level is 1
});

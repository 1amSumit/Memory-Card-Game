import { atom } from "recoil";

export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const highScoreUsername = atom({
  key: "highScoreUsername",
  default: "Computer",
});

import { atom } from "recoil";

export const easyTurnState = atom({
  key: "easyTurnState",
  default: 10,
});
export const mediumTurnState = atom({
  key: "mediumTurnState",
  default: 20,
});
export const hardTurnState = atom({
  key: "hardTurnState",
  default: 30,
});
export const extremeTurnState = atom({
  key: "extremeTurnState",
  default: 40,
});

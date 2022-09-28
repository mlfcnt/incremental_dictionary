import { atom } from "recoil";
export const coinsState = atom({
  key: "coinsState",
  default: 0,
});

export const coinsMultiplierState = atom({
  key: "coinsMultiplierState",
  default: 1,
});

import React from "react";
import { useRecoilValue } from "recoil";
import { coinsMultiplierState, coinsState } from "../context/coinState";

export const Coins = () => {
  const currentCoins = useRecoilValue(coinsState);
  const multiplier = useRecoilValue(coinsMultiplierState);
  return (
    <>
      <h2>
        Coins : {Math.round(currentCoins * 100) / 100} (
        <span
          style={{ color: "green", fontWeight: "lighter", fontSize: "80%" }}
        >
          x{Math.round(multiplier * 100) / 100}
        </span>
        )
      </h2>
    </>
  );
};

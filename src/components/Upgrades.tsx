import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { coinsMultiplierState, coinsState } from "../context/coinState";

type Upgrade = {
  label: string;
  cost: number;
  action: () => void;
  coinToDisplay: number;
  hasBeenPurchased: boolean;
};

export const Upgrades = () => {
  const currentCoins = useRecoilValue(coinsState);
  const [coinMultiplier, setCoinMultiplier] =
    useRecoilState(coinsMultiplierState);

  const upgrades: Upgrade[] = [
    {
      label: "Point multiplier x 1.1",
      cost: 8,
      coinToDisplay: 5,
      hasBeenPurchased: false,
      action: () => setCoinMultiplier(coinMultiplier * 1.1),
    },
    {
      label: "Point multiplier x 1.2",
      cost: 20,
      coinToDisplay: 15,
      hasBeenPurchased: false,
      action: () => setCoinMultiplier(coinMultiplier * 1.2),
    },
    {
      label: "Point multiplier x 1.3",
      cost: 40,
      coinToDisplay: 15,
      hasBeenPurchased: false,
      action: () => setCoinMultiplier(coinMultiplier * 1.3),
    },
    {
      label: "Point multiplier x 1.4",
      cost: 40,
      coinToDisplay: 15,
      hasBeenPurchased: false,
      action: () => setCoinMultiplier(coinMultiplier * 1.4),
    },
  ];

  if (currentCoins < upgrades[0].coinToDisplay) return null;

  return (
    <>
      <h2 style={{ textAlign: "left" }}>Upgrades</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {upgrades
          .filter((x) => !x.hasBeenPurchased)
          .map((upgrade) => (
            <button
              disabled={currentCoins < upgrade.cost}
              onClick={upgrade.action}
              hidden={currentCoins < upgrade.coinToDisplay}
            >
              {upgrade.label} | {upgrade.cost} coins
            </button>
          ))}
      </div>
    </>
  );
};

import React from "react";
import { Letters } from "./Letters";

export const Workers = () => {
  return (
    <div style={{ marginTop: "30%" }}>
      <div>
        <h3>Bot 1</h3>
        <Letters automated />
      </div>
      <div>
        <h3>Bot 2</h3>
        <Letters automated />
      </div>
      <div>
        <h3>Bot 3</h3>
        <Letters automated />
      </div>
      <div>
        <h3>Bot 4</h3>
        <Letters automated />
      </div>
    </div>
  );
};

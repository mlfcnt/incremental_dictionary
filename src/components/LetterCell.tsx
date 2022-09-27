import { CSSProperties } from "react";

export type LetterState = "OK" | "CURRENT" | "WRONG" | "NOT_YET";

type Props = {
  letter: string;
  state: LetterState;
  automated?: boolean;
};

export const LetterCell = ({ letter, state, automated = false }: Props) => {
  const boxSize = automated ? "30px" : "50px";
  const font_size = "30px";

  const stateColors: Record<LetterState, CSSProperties["color"]> = {
    WRONG: "red",
    CURRENT: "orange",
    NOT_YET: "",
    OK: "green",
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        width: boxSize,
        height: boxSize,
        display: "flex",
        justifyContent: "center",
        border: `3px solid ${stateColors[state]}`,
      }}
    >
      <strong
        style={{ color: "black", fontSize: font_size, alignSelf: "center" }}
      >
        {letter.toUpperCase()}
      </strong>
    </div>
  );
};

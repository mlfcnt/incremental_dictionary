import React, { useEffect, useMemo } from "react";
import { LetterCell, LetterState } from "./LetterCell";

type Props = {
  word: string;
  currentUserInput: string | null;
  handleWordProperlyTyped: () => void;
};

export const Letters = ({
  word,
  currentUserInput,
  handleWordProperlyTyped,
}: Props) => {
  const currentUserInputLength = useMemo(
    () => currentUserInput?.length || 0,
    [currentUserInput?.length]
  );

  const getLetterState = (letterCellIdx: number): LetterState => {
    switch (true) {
      case currentUserInputLength === letterCellIdx: {
        return "CURRENT";
      }
      case currentUserInputLength > letterCellIdx: {
        return "OK";
      }
      default:
        return "NOT_YET";
    }
  };

  useEffect(() => {
    if (currentUserInputLength !== word.length) return;
    handleWordProperlyTyped();
  }, [currentUserInputLength, handleWordProperlyTyped, word.length]);

  return (
    <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
      {[...word].map((letter, idx) => (
        <LetterCell key={idx} letter={letter} state={getLetterState(idx)} />
      ))}
    </div>
  );
};

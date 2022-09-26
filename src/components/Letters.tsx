import React, { useEffect, useMemo } from "react";
import { LetterCell, LetterState } from "./LetterCell";

type Props = {
  word: string;
  currentUserInput: string | null;
  refreshCurrentWord: () => void;
  handleWordProperlyTyped: () => void;
};

export const Letters = ({
  word,
  currentUserInput,
  refreshCurrentWord,
  handleWordProperlyTyped,
}: Props) => {
  const currentUserInputLength = useMemo(
    () => currentUserInput?.length || 0,
    [currentUserInput?.length]
  );

  console.log({ word, currentUserInput });

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
    refreshCurrentWord();
  }, [
    currentUserInputLength,
    handleWordProperlyTyped,
    refreshCurrentWord,
    word.length,
  ]);

  return (
    <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
      {[...word].map((letter, idx) => (
        <LetterCell key={idx} letter={letter} state={getLetterState(idx)} />
      ))}
    </div>
  );
};

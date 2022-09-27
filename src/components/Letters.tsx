import { useCallback, useEffect, useMemo, useState } from "react";
import { handleKeyPressed } from "../helpers.ts/handleKeyPressed";
import { useSave } from "../helpers.ts/local-storage-save-helpers";
import { LetterCell, LetterState } from "./LetterCell";
import { useRecoilValue, useRecoilState } from "recoil";
import { completedWordsState, wordState } from "../context/wordState";

type Props = {
  automated?: boolean;
};

//TODO need refacto / cleanup
export const Letters = ({ automated = false }: Props) => {
  const { getRandomWord } = useRecoilValue(wordState);
  const [randomWord, setRandomWord] = useState(getRandomWord);
  const [completedWords, setCompletedWords] =
    useRecoilState(completedWordsState);

  const markWordAsCompleted = useCallback(() => {
    setCompletedWords([...completedWords, randomWord]);
    setRandomWord(getRandomWord);
  }, [getRandomWord, randomWord, setCompletedWords]);

  const [currentUserInput, setCurrentUserInput] = useState<string | null>(null);

  useEffect(() => {
    if (!automated) return;
    const interval = setInterval(() => {
      const userInputLenght = currentUserInput?.length;
      setCurrentUserInput(
        `${currentUserInput}${randomWord[userInputLenght || 0]}`
      );
    }, 100);
    return () => clearInterval(interval);
  }, [automated, currentUserInput, randomWord]);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (!randomWord) return;
      handleKeyPressed(key, randomWord, currentUserInput, setCurrentUserInput);
    },
    [currentUserInput, randomWord]
  );

  useEffect(() => {
    if (automated) return;
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [automated, handleUserKeyPress]);

  useSave({ completedWords });

  const currentUserInputLength = useMemo(() => {
    return currentUserInput?.length || 0;
  }, [currentUserInput?.length]);

  const handleWordProperlyTyped = useCallback(() => {
    if (!randomWord) return;
    setCurrentUserInput("");
    markWordAsCompleted();
  }, [markWordAsCompleted, randomWord]);

  useEffect(() => {
    if (currentUserInputLength !== randomWord?.length) return;
    handleWordProperlyTyped();
  }, [currentUserInputLength, handleWordProperlyTyped, randomWord?.length]);

  if (!randomWord) return null;

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

  return (
    <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
      {[...randomWord].map((letter, idx) => (
        <LetterCell
          key={idx}
          letter={letter}
          state={getLetterState(idx)}
          automated={automated}
        />
      ))}
    </div>
  );
};

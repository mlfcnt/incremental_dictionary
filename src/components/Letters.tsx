import { useCallback, useEffect, useMemo, useState } from "react";
import { handleKeyPressed } from "../helpers.ts/handleKeyPressed";
import { useSave } from "../helpers.ts/local-storage-save-helpers";
import { LetterCell, LetterState } from "./LetterCell";
import { useRecoilValue, useRecoilState } from "recoil";
import { completedWordsState, wordState } from "../context/wordState";
import { coinsMultiplierState, coinsState } from "../context/coinState";

type Props = {
  automated?: boolean;
};

//TODO need refacto / cleanup
export const Letters = ({ automated = false }: Props) => {
  const AUTOMATED_TYPING_SPEED = 1000;
  const { getRandomWord } = useRecoilValue(wordState);
  const [currentCoins, setCurrentCoins] = useRecoilState(coinsState);
  const currentCoinMultiplier = useRecoilValue(coinsMultiplierState);
  const [completedWords, setCompletedWords] =
    useRecoilState(completedWordsState);
  const [randomWord, setRandomWord] = useState(getRandomWord);

  const [currentUserInput, setCurrentUserInput] = useState<string | null>(null);

  useEffect(() => {
    if (!automated) return;
    const interval = setInterval(() => {
      const userInputLenght = currentUserInput?.length;
      setCurrentUserInput(
        `${currentUserInput}${randomWord[userInputLenght || 0]}`
      );
    }, AUTOMATED_TYPING_SPEED);
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

  const updateCompletedWords = () =>
    setCompletedWords([...completedWords, randomWord]);

  const updateCoins = () => {
    setCurrentCoins(currentCoins + 1 * currentCoinMultiplier);
  };

  const handleWordProperlyTyped = useCallback(() => {
    if (!randomWord) return;
    setCurrentUserInput("");
    updateCompletedWords();
    updateCoins();
    setRandomWord(getRandomWord);
  }, [getRandomWord, randomWord]);

  useEffect(() => {
    if (currentUserInputLength !== randomWord?.length) return;
    handleWordProperlyTyped();
  }, [currentUserInputLength, handleWordProperlyTyped, randomWord?.length]);

  const getLetterState = useCallback(
    (letterCellIdx: number): LetterState => {
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
    },
    [currentUserInputLength]
  );

  if (!randomWord) return null;

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

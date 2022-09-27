import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Letters } from "./components/Letters";
import { useRandomWord } from "./helpers.ts/current-word-helpers";
import { handleKeyPressed } from "./helpers.ts/handleKeyPressed";
import { useSave, resetSave } from "./helpers.ts/local-storage-save-helpers";

type Word = string;
export type WordDic = Record<Word, number>;

function App() {
  const {
    currentWord,
    refreshCurrentWord,
    allWords,
    setWordsYetToWrite,
    wordsCompleted,
    setWordsCompleted,
  } = useRandomWord();

  console.log({ wordsCompleted });

  const totalWordsCompleted = useMemo(
    () => wordsCompleted?.length || 0,
    [wordsCompleted?.length]
  );

  const [currentUserInput, setCurrentUserInput] = useState<string | null>(null);
  useSave({ wordsCompleted });

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (!currentWord) return;
      handleKeyPressed(key, currentWord, currentUserInput, setCurrentUserInput);
    },
    [currentUserInput, currentWord]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  if (!currentWord || !allWords) {
    return <p>Loading...</p>;
  }

  const handleWordProperlyTyped = () => {
    setCurrentUserInput("");
    setWordsCompleted([...(wordsCompleted || []), currentWord]);
    setWordsYetToWrite(allWords.filter((x) => x !== currentWord));
    refreshCurrentWord();
  };

  return (
    <>
      <h1>Incremental dictionary</h1>
      <h2>
        Total words written : {totalWordsCompleted} / {allWords.length}
      </h2>
      <Letters
        word={currentWord}
        currentUserInput={currentUserInput}
        handleWordProperlyTyped={handleWordProperlyTyped}
      />
      <button
        style={{ position: "absolute", top: "2vh", left: "2vw" }}
        onClick={resetSave}
      >
        Reset game
      </button>
    </>
  );
}

export default App;

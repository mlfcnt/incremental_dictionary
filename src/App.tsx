import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Letters } from "./components/Letters";
import { useRandomWord } from "./helpers.ts/current-word-helpers";
import { handleKeyPressed } from "./helpers.ts/handleKeyPressed";
import {
  retrieveSave,
  useSave,
  resetSave,
} from "./helpers.ts/local-storage-save-helpers";

type Word = string;
export type WordDic = Record<Word, number>;

function App() {
  const { currentWord, refreshCurrentWord, allWords, setWordsYetToWrite } =
    useRandomWord();
  const [totalWordsWritten, setTotalWordsWritten] = useState(
    () => retrieveSave() || 0
  );

  const [currentUserInput, setCurrentUserInput] = useState<string | null>(null);
  useSave({ totalWordsWritten });

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
    setTotalWordsWritten(totalWordsWritten + 1);
    setWordsYetToWrite(allWords.filter((x) => x !== currentWord));
    refreshCurrentWord();
  };

  return (
    <>
      <h1>Incremental dictionary</h1>
      <h2>
        Total words written : {totalWordsWritten} / {allWords.length}
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

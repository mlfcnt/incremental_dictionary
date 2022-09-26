import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Letters } from "./components/Letters";
import { useRandomWord } from "./helpers.ts/current-word-helpers";
import { handleKeyPressed } from "./helpers.ts/handleKeyPressed";
import { retrieveSave, useSave } from "./helpers.ts/local-storage-save-helpers";

type Word = string;
export type WordDic = Record<Word, number>;

function App() {
  const [totalWordsWritten, setTotalWordsWritten] = useState(
    () => retrieveSave() || 0
  );
  const { currentWord, refreshCurrentWord } = useRandomWord(5);

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

  if (!currentWord) {
    return <p>Loading...</p>;
  }

  const handleWordProperlyTyped = () => {
    setCurrentUserInput("");
    setTotalWordsWritten(totalWordsWritten + 1);
  };

  return (
    <>
      <h1>Incremental dictionary</h1>
      <h2>Total words written : {totalWordsWritten}</h2>
      <Letters
        word={currentWord}
        currentUserInput={currentUserInput}
        refreshCurrentWord={refreshCurrentWord}
        handleWordProperlyTyped={handleWordProperlyTyped}
      />
    </>
  );
}

export default App;

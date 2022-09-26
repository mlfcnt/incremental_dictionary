import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Letters } from "./components/Letters";
import { useRandomWord } from "./helpers.ts/current-word-helpers";
import { handleKeyPressed } from "./helpers.ts/handleKeyPressed";

type Word = string;
export type WordDic = Record<Word, number>;

function App() {
  const [totalWordsWritten, setTotalWordsWritten] = useState(0);
  const { currentWord, refreshCurrentWord } = useRandomWord(5);

  const [currentUserInput, setCurrentUserInput] = useState<string | null>(null);

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

  const resetCurrentUserInput = () => setCurrentUserInput("");

  return (
    <>
      <h1>Incremental dictionary</h1>
      <h2>Total words written : {totalWordsWritten}</h2>
      <Letters
        word={currentWord}
        currentUserInput={currentUserInput}
        refreshCurrentWord={refreshCurrentWord}
        handleWordProperlyTyped={() => {
          resetCurrentUserInput();
          setTotalWordsWritten(totalWordsWritten + 1);
        }}
      />
    </>
  );
}

export default App;

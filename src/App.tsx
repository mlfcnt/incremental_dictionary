import "./App.css";
import { Letters } from "./components/Letters";
import { Workers } from "./components/Workers";
import {
  resetSave,
  retrieveSave,
} from "./helpers.ts/local-storage-save-helpers";
import { useRecoilValue, useRecoilState } from "recoil";
import { completedWordsState, wordState } from "./context/wordState";
import { useEffect } from "react";

type Word = string;
export type WordDic = Record<Word, number>;

function App() {
  const { allWords } = useRecoilValue(wordState);
  const [completedWords, setCompletedWords] =
    useRecoilState(completedWordsState);

  useEffect(() => {
    const fromSave = retrieveSave();
    setCompletedWords(fromSave);
  }, [setCompletedWords]);

  if (!allWords) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Incremental dictionary</h1>
      <h2>
        Total words completed : {completedWords.length} / {allWords.length}
      </h2>
      <Letters />
      <Workers />
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

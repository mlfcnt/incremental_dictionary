import "./App.css";
import { Letters } from "./components/Letters";
import {
  resetSave,
  retrieveSave,
} from "./helpers.ts/local-storage-save-helpers";
import { useRecoilValue, useRecoilState } from "recoil";
import { completedWordsState, wordState } from "./context/wordState";
import { useEffect } from "react";
import { Upgrades } from "./components/Upgrades";
import { Coins } from "./components/Coins";

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
      <h1 style={{ display: "inline" }}>Incremental dictionary </h1>{" "}
      <h3 style={{ display: "inline" }}>(Not a game yet...)</h3>
      <h2>
        Total words completed : {completedWords.length} / {allWords.length}
      </h2>
      <Letters />
      {/* <Workers /> */}
      <div style={{ position: "absolute", top: "8vh", left: "2vw" }}>
        <Coins />
      </div>
      <button
        style={{ position: "absolute", top: "2vh", left: "2vw" }}
        onClick={resetSave}
      >
        Reset game
      </button>
      <div style={{ position: "absolute", top: "70vh", left: "2vw" }}>
        <Upgrades />
      </div>
    </>
  );
}

export default App;

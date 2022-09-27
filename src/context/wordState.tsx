import { selector, atom } from "recoil";
import { fetchWordList } from "../words";

const getAllWords = async () =>
  fetchWordList().then((wordDic) => Object.keys(wordDic));

export const wordState = selector({
  key: "wordState",
  get: async ({ get }) => {
    const allWords = await getAllWords();
    const wordsToComplete = get(wordsToCompleteState);
    const getRandomWord = () =>
      wordsToComplete?.[Math.floor(Math.random() * wordsToComplete.length)];
    return { wordsToComplete, allWords, getRandomWord };
  },
});

const wordsToCompleteState = atom({
  key: "wordsToComplete",
  default: getAllWords(),
});

export const completedWordsState = atom({
  key: "completedWords",
  default: [] as any,
});

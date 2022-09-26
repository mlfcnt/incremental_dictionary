import { WordDic } from "./App";

export const fetchWordList = async (): Promise<WordDic> => {
  const res = await fetch(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
  );
  return res.json();
};

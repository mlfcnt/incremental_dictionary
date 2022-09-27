// import { useEffect, useMemo, useState } from "react";
// import { WordDic } from "../App";
// import { fetchWordList } from "../words";

// export const useWordList = () => {
//   const [wordDic, setWordDic] = useState<WordDic | null>(null);
//   const ALL_WORDS = useMemo(() => wordDic && Object.keys(wordDic), [wordDic]);
//   const wordsAreLoaded = useMemo(() => ALL_WORDS?.length, [ALL_WORDS?.length]);

//   useEffect(() => {
//     if (wordsAreLoaded) return;
//     fetchWordList().then((wordDic) => setWordDic(wordDic));
//   }, [wordsAreLoaded]);

//   return { ALL_WORDS, WORD_DIC: wordDic };
// };

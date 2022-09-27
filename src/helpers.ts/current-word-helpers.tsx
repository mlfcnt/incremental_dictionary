import { useCallback, useEffect, useMemo, useState } from "react";
import { retrieveSave } from "./local-storage-save-helpers";
import { useWordList } from "./useWordList";

export const useRandomWord = (maxWordLength = 40) => {
  //TODO stocker les mots deja trouvés dans le local storage? (jwt?) sinon quand on refresh la liste des mots restants est remise a 0
  const { ALL_WORDS } = useWordList();
  const [currentWord, setCurrentWord] = useState<string | null>();
  const [wordsYetToWrite, setWordsYetToWrite] = useState<string[]>([]);
  const [wordsCompleted, setWordsCompleted] = useState<string[]>(
    () => retrieveSave()?.wordsCompleted
  );

  const filteredByLength = useMemo(
    () => (ALL_WORDS || []).filter((word) => word.length <= maxWordLength, []),
    [ALL_WORDS, maxWordLength]
  );

  useEffect(() => {
    setWordsYetToWrite(filteredByLength);
  }, [filteredByLength]);

  const refreshWord = useCallback(
    () =>
      setCurrentWord(
        wordsYetToWrite?.[Math.floor(Math.random() * wordsYetToWrite.length)]
      ),
    [wordsYetToWrite]
  );

  useEffect(() => {
    refreshWord();
  }, [refreshWord]);

  return {
    currentWord,
    refreshCurrentWord: refreshWord,
    allWords: filteredByLength,
    setWordsYetToWrite,
    wordsCompleted,
    setWordsCompleted,
  };
};

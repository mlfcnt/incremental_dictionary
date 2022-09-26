import { useCallback, useEffect, useMemo, useState } from "react";
import { useWordList } from "./useWordList";

export const useRandomWord = (maxWordLength = 4) => {
  const { ALL_WORDS } = useWordList();
  const [currentWord, setCurrentWord] = useState<string | null>();

  const filteredWordsList = useMemo(
    () => (ALL_WORDS || []).filter((word) => word.length <= maxWordLength, []),
    [ALL_WORDS, maxWordLength]
  );

  const refreshWord = useCallback(
    () =>
      setCurrentWord(
        filteredWordsList?.[
          Math.floor(Math.random() * filteredWordsList.length)
        ]
      ),
    [filteredWordsList]
  );

  useEffect(() => {
    refreshWord();
  }, [refreshWord]);

  return { currentWord, refreshCurrentWord: refreshWord };
};

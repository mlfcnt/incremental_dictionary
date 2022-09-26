import { useEffect } from "react";

type Props = {
  totalWordsWritten: number;
};

const TOTAL_WORDS = "total_words";

export const useSave = ({ totalWordsWritten = 0 }: Props) => {
  useEffect(() => {
    localStorage.setItem(TOTAL_WORDS, String(totalWordsWritten));
  }, [totalWordsWritten]);
};

export const retrieveSave = () => {
  const totalWords = localStorage.getItem(TOTAL_WORDS);
  return Number(totalWords);
};

export const resetSave = () => {
  localStorage.setItem(TOTAL_WORDS, String(0));
  window.location.reload();
};

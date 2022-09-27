import { useEffect } from "react";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";

type Props = {
  totalWordsWritten: number;
};

const TOTAL_WORDS = "total_words";

export const useSave = ({ totalWordsWritten = 0 }: Props) => {
  useEffect(() => {
    localStorage.setItem(
      TOTAL_WORDS,
      compressToUTF16(String(totalWordsWritten))
    );
  }, [totalWordsWritten]);
};

export const retrieveSave = () => {
  const totalWords = localStorage.getItem(TOTAL_WORDS);
  if (!totalWords) return;
  return Number(decompressFromUTF16(totalWords));
};

export const resetSave = () => {
  localStorage.setItem(TOTAL_WORDS, String(0));
  window.location.reload();
};

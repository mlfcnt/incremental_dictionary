import { useEffect } from "react";
// import { compressToUTF16, decompressFromUTF16 } from "lz-string"; //TODO maybe ?

type Props = {
  wordsCompleted: string[];
};

const LOCAL_STORAGE_KEY = "inc_dic";

export const useSave = ({ wordsCompleted }: Props) => {
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ wordsCompleted }));
  }, [wordsCompleted]);
};

export const retrieveSave = () => {
  const saveContent = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saveContent) return;
  const { wordsCompleted } = JSON.parse(saveContent);

  console.log("parsed", wordsCompleted);

  return {
    wordsCompleted,
  };
};

export const resetSave = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, String(0));
  window.location.reload();
};

import { useEffect } from "react";
// import { compressToUTF16, decompressFromUTF16 } from "lz-string"; //TODO maybe ?

type Props = {
  completedWords: string[];
};

const LOCAL_STORAGE_KEY = "inc_dic";

export const useSave = ({ completedWords }: Props) => {
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ completedWords }));
  }, [completedWords]);
};

export const retrieveSave = (): string[] => {
  const saveContent = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saveContent) return [];
  const { completedWords }: { completedWords: string[] } =
    JSON.parse(saveContent);

  return completedWords;
};

export const resetSave = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, String(0));
  window.location.reload();
};

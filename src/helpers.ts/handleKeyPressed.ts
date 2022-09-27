import { Dispatch, SetStateAction } from "react";

export const handleKeyPressed = (
  keyPressed: string,
  currentWord: string,
  currentUserInput: string | null,
  setCurrentUserInput: Dispatch<SetStateAction<string | null>>
) => {
  const letterToGuess = currentWord[currentUserInput?.length || 0];
  if (keyPressed?.toUpperCase() === letterToGuess?.toUpperCase()) {
    setCurrentUserInput(`${currentUserInput || ""}${keyPressed}`);
  }
};

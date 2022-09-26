export const capitalizeFirstLetter = ([firstLetter, ...rest]: string) =>
  `${firstLetter.toUpperCase()}${rest.join("")}`;

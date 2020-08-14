export const randomFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const truncString = (string, maxLength, dot = true) => {
  if (string.length > maxLength) {
    return string.slice(0, maxLength) + (dot ? "..." : "");
  }
  return string;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

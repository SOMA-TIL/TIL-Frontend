export const makeRandomColor = () => {
  const colorR = Math.floor(Math.random() * 127 + 128).toString(16);
  const colorG = Math.floor(Math.random() * 127 + 128).toString(16);
  const colorB = Math.floor(Math.random() * 127 + 128).toString(16);

  return `#${colorR + colorG + colorB}`;
};

export const makeRandomColorList = (length: number) => Array.from({ length }, makeRandomColor);

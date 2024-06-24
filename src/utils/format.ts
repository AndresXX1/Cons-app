export const firstWord = (string: string) => {
  const texts = string.trim().split(' ');
  const firstText = texts[0];
  return firstText.charAt(0).toUpperCase() + firstText.slice(1).toLowerCase();
};

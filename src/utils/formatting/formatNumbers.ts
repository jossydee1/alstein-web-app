export const formatNumberWithCommas = (number: number): string => {
  if (typeof number !== "number") return "";

  const newNumber = number.toLocaleString();

  return newNumber;
};

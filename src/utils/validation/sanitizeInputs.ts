// Ensure all leading zeros are removed, but keep "0" if the input is "0"
export const sanitizeLeadingZero = (value: string): string => {
  const sanitizedValue = value.replace(/^0+(?!$)/, "");
  return sanitizedValue;
};

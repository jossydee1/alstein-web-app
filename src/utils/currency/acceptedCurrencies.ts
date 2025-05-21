export const acceptedCurrencies = ["NGN", "USD"];

export const formatCurrencySymbol: { [key: string]: string } = {
  NGN: "₦",
  USD: "$",
};

// example
// const currency = acceptedCurrencies[0];
// const currencySymbol = formatCurrencySymbol[currency];
// alert(currencySymbol);
// Output: ₦

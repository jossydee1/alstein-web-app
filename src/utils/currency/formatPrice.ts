type CurrencyFormatFunction = (money: number | bigint) => string;

type FormatPriceFunction = (
  price: number | bigint,
  selectedCurrency: string,
) => string;

const formatNGN: CurrencyFormatFunction = money => {
  // formats price to naira and kobo
  // eg. 1234.50 becomes NGN1234.50
  const newMoney = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(money);
  return newMoney;
};

const formatUSD: CurrencyFormatFunction = money => {
  // formats price to dollar and cents
  // eg. 1234.50 becomes USD1234.50
  const newMoney = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);
  return newMoney;
};

export const formatPrice: FormatPriceFunction = (price, selectedCurrency) => {
  // dividve price by 100 to get the actual price
  // because the price is in kobo
  const newPrice =
    typeof price === "bigint" ? price / BigInt(100) : price / 100;

  // format price based on selected currency
  switch (selectedCurrency) {
    case "NGN":
      return formatNGN(newPrice);
    case "USD":
      return formatUSD(newPrice);
    default:
      return "Currency not supported";
  }
};

// example
// const price = 123450; // in kobo
// const selectedCurrency = "NGN";
// const formattedPrice = formatPrice(price, selectedCurrency);
// alert(formattedPrice);
// Output: NGN1,234.50

export function filterNumberInput(event: any, value: any, preVal: any) {
  let strRemoveText = value.replace(/[^0-9.]/g, "");
  let str = strRemoveText.replace(/\./g, (val: any, i: any) => {
    if (strRemoveText.indexOf(".") !== i) val = "";
    return val;
  });

  if (str === ".") str = "0.";

  event.target.value = str;

  return preVal !== str;
}

export const convertToUnit256 = (amount: string | number): string => {
  return amount.toLocaleString("fullwide", { useGrouping: false });
};

export const ipToNumber = (ip: string) => {
  let ipSplitted = ip.split(".");
  ipSplitted = ipSplitted.map((part: string) => {
    if (part.length < 3) {
      return `00${part}`.slice(-3);
    }
    return part;
  });

  return Number(ipSplitted.join(""));
};

export function calculatePriceDifference(currentRate: number, refRate: number) {
  return ((currentRate - refRate) / refRate) * 100;
}

export function toMeaningfulNumber(number: number): number {
  const meaningfulNumber = number.toFixed(20).match(/^-?\d*\.?0*\d{0,4}/);
  if (!meaningfulNumber) return 0;
  return +meaningfulNumber[0];
}

export function shortenNumber(number: number) {
  const symbol = ["", "K", "M", "B", "T", "P", "E"];
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number.toFixed(1);

  const suffix = symbol[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + (suffix || "VB");
}

export const meaningDecimalNumber = (number: number) => {
  if (number === 0 || +`${number.toFixed(10)}`.split(".")[0] > 0) {
    return 2;
  }
  try {
    const decimalPart = `${number.toFixed(10)}`.split(".")[1] || " ";
    if (decimalPart.match(/[^1-9]+/)) {
      // @ts-ignore
      return decimalPart.match(/[^1-9]+/)[0].length + 3;
    }
    return 2;
  } catch (e) {
    console.log(e);
    return 2;
  }
};

export const priceColor = (price: number) => {
  if (price === 0) {
    return "white.800";
  }
  if (price > 0) {
    return "primary.300";
  }

  return "red.400";
};

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const urlify = (text: string) => {
  return text.replace(urlRegex, function (url) {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
};

export function getColorFromPriceChanged(priceChange: number) {
  if (isNaN(priceChange) || !priceChange) return "#1de9b6";
  if (priceChange >= 0) return "#1de9b6";
  // if (priceChange === 0) return "#fff";
  return "#fe6d40";
}

export const getNumberDecimalSupportedToDisplay = (number: any) => {
  const numberCharacter = parseInt(`${number}`).toString().length;
  return numberCharacter + 1;
};

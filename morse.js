//https://docs.google.com/document/d/1T121klM_uBUWCYTS9_BJjAKlFnTSZf-_/edit#heading=h.gjdgxs
const signal = [
  0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
  0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0,
  0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1,
  1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0,
];

const obj = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
};

const decode = () => {
  let result = "";
  let tempForOnes = 0;
  let tempForZeros = 0;
  while (signal.length > 0) {
    let temp = signal.shift();
    if (temp == 1) {
      if (tempForZeros > 0) {
        if (decodeZero(tempForZeros) !== false) {
          result += decodeZero(tempForZeros);
          tempForZeros = 0;
          tempForOnes++;
        } else {
          return "invalid 0 input";
        }
      } else {
        tempForOnes++;
      }
    } else if (temp == 0) {
      if (tempForOnes > 0) {
        if (decodeOne(tempForOnes) !== false) {
          result += decodeOne(tempForOnes);
          tempForOnes = 0;
          tempForZeros++;
        } else {
          return "invalid 1 input";
        }
      } else {
        tempForZeros++;
      }
    } else {
      return "invalid number input";
    }
  }
  if (tempForOnes > 0) {
    if (decodeOne(tempForOnes) !== false) {
      result += decodeOne(tempForOnes);
    } else return "invalid 1 input";
  }
  if (tempForZeros > 0) {
    if (decodeZero(tempForZeros) !== false) {
      result += decodeZero(tempForZeros);
    } else return "invalid 0 input";
  }
  return result;
};

const decodeZero = (num) => {
  if (num === 1 || num === 2) {
    return "";
  } else if (num === 3 || num === 4 || num === 5) {
    return " ";
  } else if (num === 6) {
    return "*";
  } else {
    return false;
  }
};

const decodeOne = (num) => {
  if (num === 1 || num === 2) {
    return ".";
  } else if (num === 3 || num === 4 || num === 5) {
    return "-";
  } else {
    return false;
  }
};

const resultStr = decode();

const translation = (str = "") => {
  console.log(str);
  let result = "";
  let words = str.split("*");
  words.forEach((word) => {
    word.split(" ").forEach((letter) => (result += obj[letter]));
    result += " ";
  });
  return result.trim();
};

console.log(translation(resultStr));

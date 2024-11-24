//https://docs.google.com/document/d/1Gooa25BMwOTQE7wLMHRYN1ZN8v82SOeUBNhPrKWAeV8/edit#heading=h.dhlajsvh3knb
const string = "abcdefghijklmnopqrstuvwxyz0123456789";

const createMatrix = (str = "") => {
  let arr = [];
  let tempArr = [];
  str.split("").map((s) => {
    tempArr.push(s);
    if (tempArr.length === 6) {
      arr.push(tempArr);
      tempArr = [];
    }
  });

  return arr;
};

const decodeArr = (arr = [0]) => {
  let result = "";
  const cryptoMatrix = createMatrix(string);
  arr.map((num) => {
    result += cryptoMatrix[Math.floor(num / 10) - 1][(num % 10) - 1];
  });
  console.log(result);
  return result;
};

const decodeStr = (str = "") => {
  let result = [];
  const strArr = str.split("");
  strArr.map((str) => result.push(findIndex(str)));
  console.log(result);
  return result;
};

const findIndex = (str) => {
  const cryptoMatrix = createMatrix(string);
  for (let i = 0; i < cryptoMatrix.length; i++) {
    for (let j = 0; j < cryptoMatrix[i].length; j++) {
      const element = cryptoMatrix[i][j];
      if (str === element) {
        return (i + 1) * 10 + j + 1;
      }
    }
  }
};

const oneDemensionArr = (str = "", secret = "") => {
  const arr = []
  if(secret) {
    for(let i = 0; i < secret.length; i++) {
        arr.push(secret[i])
    }
  }
  for(let j = 0; j < str.length; j++) {
    arr.indexOf(str[j]) < 0 && arr.push(str[j])
  }
  return arr;
};

const decodeOneD = (str = "") => {
  let result = [];
  const arr = oneDemensionArr(string, "orange");
  str.split("").map((char) => {
    let temp = arr.indexOf(char);
    if (temp >= 0) {
      result.push((Math.floor(temp / 6) + 1) * 10 + (temp % 6) + 1);
    }
  });

  //console.log(result);
  return result
};

const nihilistDecode = (str1 = "", str2 = "") => {
    let result = []
    for(let i = 0; i < str1.length; i++) {
        let n1=decodeOneD(str1[i])[0]
        if(!str2[i]) str2 += str2
        let n2=decodeOneD(str2[i])[0]
        result.push(n1 + n2)
    }
    console.log(result)
}

//decodeArr([22, 15, 26, 26, 33]);
//decodeStr("aaa");
//decodeOneD("hello");
nihilistDecode("helloworld", "bob")
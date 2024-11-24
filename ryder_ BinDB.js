//https://docs.google.com/document/d/1EEN7HbYeqy3n8QVqVc1I62bXvGgSDpeC/edit#heading=h.gjdgxs
const trustType = {
  lowTrust: 0,
  midTrust: 1,
  highTrust: 2,
};

class BinStorage {
  constructor() {
    this.store = [];
  }

  lookup(cardNumber) {
    let result = [] 
    this.store.map((res) => {
      res.number === cardNumber && trustType[res.trustRate] === 2 && result.push(res);
    });
    return result;
  }

  save(bin = new Bin()) {
    if (`${bin.number}`.length !== 6) return "wrong bin number size.";
    if (this.lookup(bin.number)) {
      this.delete(bin.number);
      this.store.push(bin);
      return `${bin.number} is stored`;
    } else {
      this.store.push(bin);
      return `${bin.number} is stored`;
    }
  }

  delete(cardNumber) {
    this.store = this.store.filter((res) => res.number !== cardNumber);
  }

  get() {
    return this.store;
  }
}

class Bin {
  constructor(number, cardType, cardBrand, trustRate) {
    this.number = number;
    this.cardBrand = cardBrand;
    this.cardType = cardType;
    this.trustRate = trustRate;
  }
}

let newBin = new Bin(123456, "A", "ABC", "lowTrust");
let newStorage = new BinStorage();
newStorage.save(newBin);
console.log(newStorage.lookup(123456))
console.log(newStorage.get());

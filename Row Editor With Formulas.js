//https://docs.google.com/document/d/183fpcxrXOkFEmDj3kgtFkILntHpUsQjA6UK_YMyumF0/edit#heading=h.dhlajsvh3knb
class Simple {
  constructor() {
    this.data = new Map();
  }

  set_val(idx, val) {
    if (typeof val === "string" || Number.isInteger(val) || Array.isArray(val)) {
      this.data.set(idx, val);
    } else {
      throw new TypeError("value must be a string or an integer");
    }
  }

  get_val(idx) {
    const value = this.data.get(idx);
    if(typeof value === "string" && value.startsWith("=") ){
        const tempArr = value.slice(1).split("$");
        return this.calculateValue(tempArr[0], tempArr[1])
    } else {
        return value
    }
  }

  calculateValue(nums = "", index) {
    let sum = 0
    nums = nums.split("+")
    nums.pop()
    nums.forEach(element => {
        sum += element * 1
    });
    return this.get_val(index * 1) + sum
  }
}

let sparseArray = new Simple();
sparseArray.set_val(1, 10);
sparseArray.set_val(2, "=1+2+3+$1");
sparseArray.set_val(3, "=1+$2");
console.log(sparseArray.get_val(3));
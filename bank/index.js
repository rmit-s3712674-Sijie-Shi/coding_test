// import { createUser } from "./userFunctions";
// import { deposit, withdraw, checkBalance } from "./activitiesFunctions";

const user = {};

const checkUserBalance = (name) => {
  return user[name];
};

const createUser = (name) => {
  if (user[name]) return `User ${name} is already exist.`;
  user[name] = 0;
  return `User ${name} has been created.`;
};

const changeAmount = (name, amount) => {
  user[name] = amount;
  return `User balance updated.`;
};

const checkBalance = (name) => {
  return checkUserBalance(name) ? checkUserBalance(name) : "user not found";
};

const deposit = (name, amount) => {
  if (amount < 0 || typeof amount !== "number")
    return "Please enter a legal number.";
  const currentBalance = checkUserBalance(name);
  if (typeof currentBalance === "number") {
    return changeAmount(name, currentBalance + amount);
  } else {
    return currentBalance;
  }
};

const withdraw = (name, amount) => {
  if (amount < 0 || typeof amount !== "number")
    return "Please enter a legal number.";
  const currentBalance = checkUserBalance(name);
  if (typeof currentBalance === "number") {
    if (currentBalance < amount)
      return `User ${name} doesn't have enough balance.`;
    return changeAmount(name, currentBalance - amount);
  } else {
    return currentBalance;
  }
};
console.log("test");

createUser("name");
console.log("name", deposit("name", 10));
console.log(withdraw("name", 11));
console.log("name", checkBalance("l"));

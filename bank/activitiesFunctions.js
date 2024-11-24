import { checkUserBalance, changeAmount } from "./userFunctions";

export const checkBalance = (name) => {
  return checkUserBalance(name);
};

export const deposit = (name, amount) => {
  if (!checkUserBalance(name)) return `User ${name} is not found.`;
  if (amount < 0 || typeof amount !== "number")
    return "Please enter a legal number.";
  const currentBalance = checkUserBalance(name);
  changeAmount(name, currentBalance + amount);
};

export const withdraw = (name, amount) => {
  if (!checkUserBalance(name)) return `User ${name} is not found.`;
  if (amount < 0 || typeof amount !== "number")
    return "Please enter a legal number.";
  const currentBalance = checkUserBalance(name);
  if (currentBalance < amount)
    return `User ${name} doesn't have enough balance.`;
  changeAmount(name, currentBalance - amount);
};

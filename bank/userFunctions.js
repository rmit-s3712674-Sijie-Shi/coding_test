//import user from "./userStorage";
const user = {}

export const checkUserBalance = (name) => {
  return user[name];
};

export const createUser = (name) => {
  if (user[name]) return `User ${name} is already exist.`;
  user[name] = 0;
  return `User ${name} has been created.`;
};

export const changeAmount = (name, amount) => {
  user[name] = amount;
};

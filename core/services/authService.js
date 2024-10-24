import { signIn, signUp } from "../repositories/authRepository";

export const loginUser = async (username, password) => {
  const data = await signIn(username, password);
  return data.token;
};

export const registerUser = async (username, password, email) => {
  const data = await signUp(username, password, email);
  return data.user;
};

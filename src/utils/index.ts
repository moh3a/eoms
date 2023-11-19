import { genSaltSync, hashSync } from "bcrypt";

export const hashPassword = (password: string) => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};

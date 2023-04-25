import bcrypt from "bcrypt";

const saltRounds = 10;
const myPlainTextPassword = "hello world";
const someOtherPlainTextPassword = "hey";

export const hashPassword = (plainTextPassword: string) => {
  // bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  //     if(err) return [null, err];
  //     return [hash, null];
  // })
  const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
  return hashedPassword;
};

export const checkPassword = (
  plainTextPassword: string,
  hashedPassword: string
) => {
  const match = bcrypt.compareSync(plainTextPassword, hashedPassword);
  if (match) return true;
  return false;
};

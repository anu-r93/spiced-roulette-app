import bcrypt from "bcryptjs";

export const generatePassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

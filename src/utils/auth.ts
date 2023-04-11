import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const comparePasswords = async (password: string, hashedPassword: string) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const createJWT = (id: string, email: string) => {
  const token = jwt.sign({ id, email }, process.env.SECRET_STRING!);
  return token;
};

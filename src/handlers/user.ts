import type { ExpressAPIHandler } from "../types";
import { UserModel } from "../model/user";
import { hashPassword, createJWT, comparePasswords } from "../middleware/auth";

export const createNewUser: ExpressAPIHandler = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({ name, email, password: hashedPassword });

    const token = createJWT(user.id, user.email);

    return res.json({ data: { email, token } });
  } catch (err) {
    console.log(err);
  }
};

export const signInUser: ExpressAPIHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = createJWT(user.id, user.email);

    return res.json({ data: { email, token } });
  } catch (err) {
    console.log(err);
  }
};

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from "../model/user.js";
import { hashPassword, createJWT, comparePasswords } from "../utils/auth.js";
export const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield hashPassword(password);
        const user = yield UserModel.create({ name, email, password: hashedPassword });
        const token = createJWT(user.id, user.email);
        return res.json({ data: { email, token } });
    }
    catch (err) {
        console.log(err);
    }
});
export const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = yield comparePasswords(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = createJWT(user.id, user.email);
        return res.json({ data: { email, token } });
    }
    catch (err) {
        console.log(err);
    }
});

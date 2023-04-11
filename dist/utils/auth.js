var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcrypt.compare(password, hashedPassword);
    return match;
});
export const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    const hash = yield bcrypt.hash(password, salt);
    return hash;
});
export const createJWT = (id, email) => {
    const token = jwt.sign({ id, email }, process.env.SECRET_STRING);
    return token;
};

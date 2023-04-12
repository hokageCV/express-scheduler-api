import type { ExpressAPIHandler } from "../types";
import { UserModel } from "../model/user";
// import type { ExpressAPIHandler } from "../types.js";

import { getTokens, oAuth2Client } from "../utils/googleAuth";
import { calendar } from "../utils/gcal";

export const getGoogleAuthUrl: ExpressAPIHandler = async (req, res) => {
  try {
    const url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
      state: "test",
    });

    return res.redirect(url);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const getGoogleAccessToken: ExpressAPIHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // ====
    const bearer = req.headers.authorization;
    if (!bearer) {
      return res.status(401).json({ message: "bearer token not found" });
    }

    const [, token] = bearer.split(" ");
    if (!token) {
      return res.status(401).json({ message: "not the required token" });
    }
    // ====

    const something = await getTokens(token as string);

    return res.status(200).json({ message: "done!" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

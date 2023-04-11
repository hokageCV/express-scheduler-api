import type { ExpressAPIHandler } from "../types";
// import type { ExpressAPIHandler } from "../types.js";
import { google } from "googleapis";

const auth2client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

export const getGoogleAuthUrl: ExpressAPIHandler = (req, res) => {
  const url = auth2client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  return res.redirect(url);
};

export const getGoogleAccessToken: ExpressAPIHandler = (req, res) => {
  res.send("hey hey hey!");
};

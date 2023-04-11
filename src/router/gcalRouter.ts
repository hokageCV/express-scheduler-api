import { Router } from "express";
import { getGoogleAuthUrl, getGoogleAccessToken } from "../handlers/gcal";
// import { getGoogleAuthUrl, getGoogleAccessToken } from "../handlers/gcal.js";

const gcalRouter = Router();

// ======================================

gcalRouter.get("/", getGoogleAuthUrl);

gcalRouter.get("/redirect", getGoogleAccessToken);

// ======================================

export default gcalRouter;

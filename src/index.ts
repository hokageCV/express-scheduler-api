import * as dotenv from "dotenv";
dotenv.config();
import swaggerDocs from "./utils/swagger";
// import swaggerDocs from "./utils/swagger.js";

import app from "./server";
// import app from "./server.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

// connect to DB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listenting on port ${PORT}👂👂 `);
      swaggerDocs(app, PORT as number);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });

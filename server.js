// npm packages
import express from "express";
import mongoose from "mongoose";

// Routes

// export const
import { keys } from "./src/lib/keys.js";
import { botText, botOn } from "./src/utils/botRoutes.js";

const { port, mongo_connection } = keys;

const app = express();

app.use(express.json());

botText();
botOn();

app.get("/", (req, res) => {
  console.log("This is a get request");
  res.send("This is the server");
});

mongoose
  .connect(mongo_connection)
  .then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => err.message);

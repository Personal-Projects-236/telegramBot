import express from "express";
import mongoose from "mongoose";

import { keys } from "./src/lib/keys.js";

const { port, mongo_connection } = keys;

const app = express();

// TODO: add mongoose to connect to mongodb atlas

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

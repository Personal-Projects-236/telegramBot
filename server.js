// npm packages
import express from "express";
import mongoose from "mongoose";
import TelegramBot from "node-telegram-bot-api";

// Routes
// export const
import { keys } from "./src/lib/keys.js";
import { botText } from "./src/controllers/botOn.js";
import { botPhotos } from "./src/controllers/botPhotos.js";
import { botOn } from "./src/controllers/botMessage.js";

const { port, mongo_connection, telegram_token } = keys;

const app = express();
const bot = new TelegramBot(telegram_token, { polling: true });

app.use(express.json());

botText(bot);
botOn(bot);
botPhotos(bot);

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

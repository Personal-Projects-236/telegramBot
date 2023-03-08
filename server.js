// npm packages
import express from "express";
import mongoose from "mongoose";
import TelegramBot from "node-telegram-bot-api";

// export const
import { keys } from "./src/lib/keys.js";
import { botText } from "./src/controllers/botOn.js";
import { botPhotos } from "./src/controllers/botPhotos.js";
import { botOn } from "./src/controllers/botMessage.js";

// destructuring
const { port, mongo_connection, telegram_token } = keys;

// variables
const app = express();
const bot = new TelegramBot(telegram_token, { polling: true });

app.use(express.json());

// helper functions
botText(bot);
botOn(bot);
botPhotos(bot);

// connection to mongodb
mongoose
  .connect(mongo_connection)
  .then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => err.message);

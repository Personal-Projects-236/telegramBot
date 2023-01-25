import TelegramBot from "node-telegram-bot-api";

import { keys } from "../lib/keys.js";

const { telegram_token } = keys;

const bot = new TelegramBot(telegram_token, { polling: true });

export const botText = () =>
  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp);
  });

export const botOn = () =>
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "Received your message");
  });

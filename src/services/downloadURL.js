import { keys } from "../lib/keys.js";

const { telegram_token } = keys;

export const downloadURL = (filePath) =>
  `https://api.telegram.org/file/bot${telegram_token}/${filePath}`;

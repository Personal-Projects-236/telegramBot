import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { keys } from "../lib/keys.js";
import { downloadFile, downloadURL } from "../services/index.js";

const { telegram_token } = keys;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const botPhotos = (bot) =>
  bot.on("photo", async (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.photo[0].file_id;

    const res = await fetch(
      `https://api.telegram.org/bot${telegram_token}/getFile?file_id=${fileId}`
    );

    const res2 = await res.json();
    const filePath = res2.result.file_path;

    downloadFile(
      downloadURL(filePath),
      path.join(__dirname, `${fileId}.jpg`),
      () => console.log("Done!")
    );

    await bot.sendMessage(chatId, "Photo Received");
  });

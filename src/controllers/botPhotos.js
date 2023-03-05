import { keys } from "../lib/keys.js";
import { downloadURL } from "../services/index.js";
import imageToBase64 from "image-to-base64/image-to-base64.js";

const { telegram_token } = keys;

export const botPhotos = (bot) =>
  bot.on("photo", async (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.photo[0].file_id;

    const res = await fetch(
      `https://api.telegram.org/bot${telegram_token}/getFile?file_id=${fileId}`
    );

    const res2 = await res.json();
    const filePath = res2.result.file_path;

    imageToBase64(`${downloadURL(filePath)}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    await bot.sendMessage(chatId, "Photo Received");
  });

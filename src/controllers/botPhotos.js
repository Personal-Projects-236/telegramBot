import imageToBase64 from "image-to-base64/image-to-base64.js";

import { keys } from "../lib/keys.js";
import { downloadURL } from "../services/index.js";
import Photo from "../models/photoSchema.js";

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
      .then(async (response) => {
        let firstName = msg.chat.first_name;
        let lastName = msg.chat.last_name;
        let userName = msg.chat.username;

        const photo = new Photo({
          firstName,
          lastName,
          userName,
          image: response,
        });

        await photo.save();
      })
      .catch((error) => {
        console.log(error);
      });

    await bot.sendMessage(chatId, "Photo Received");
  });

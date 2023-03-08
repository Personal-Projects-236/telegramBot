import { photoToBase64 } from "../services/index.js";
import Photo from "../models/photoSchema.js";
import { postToDB } from "../utils/postToDB.js";

export const botPhotos = (bot) =>
  bot.on("photo", async (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.photo[0].file_id;
    let firstName = msg.chat.first_name;
    let lastName = msg.chat.last_name;
    let userName = msg.chat.username;
    let image = await photoToBase64(fileId);

    await postToDB(Photo, { firstName, lastName, userName, image });

    await bot.sendMessage(chatId, "Photo Received");
  });

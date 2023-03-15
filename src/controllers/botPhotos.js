// export default
import Photo from "../models/photoSchema.js";

// export const
import { postToDB } from "../utils/postToDB.js";
import { isArrayEmpty, isHigher, isNumber } from "../services/index.js";
import { photoToBase64 } from "../services/index.js";

export const botPhotos = (bot) =>
  bot.on("photo", async (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.photo[0].file_id;

    let firstName = msg.chat.first_name;
    let lastName = msg.chat.last_name;
    let userName = msg.chat.username;
    let caption = msg.caption;
    let image = await photoToBase64(fileId);

    const botObject = { bot, chatId, fileId };
    const userObject = { firstName, lastName, userName, caption, image };
    const userModel = { model: Photo, object: userObject };

    caption
      ? (await isNumber(caption))
        ? Photo.find({ userName }).then(async (res) => {
            isArrayEmpty(res)
              ? (await postToDB(userModel)) ||
                (await bot.sendMessage(
                  chatId,
                  `${firstName} ${lastName} the caption is correct, this is the first entry`
                ))
              : await isHigher(botObject, userModel, res, caption);
          })
        : await bot.sendMessage(
            chatId,
            "You have entered the incorrect caption it must only be numbers"
          )
      : await bot.sendMessage(chatId, "There is no caption on the Photo");
  });

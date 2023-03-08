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
    let caption = msg.caption;
    let image = await photoToBase64(fileId);

    let captionArray = [];

    if (caption) {
      if (parseInt(caption)) {
        Photo.find({ userName }).then(async (response) => {
          if (response.length === 0) {
            await postToDB(Photo, {
              firstName,
              lastName,
              userName,
              caption,
              image,
            });
          } else {
            //   maps captions stored in db to an array
            Object.values(response).map((items) => {
              captionArray.push(items.caption);
            });

            // if caption is higher that the one sent on Telegram
            if (captionArray[captionArray.length - 1] < caption) {
              // save new data to db
              await postToDB(Photo, {
                firstName,
                lastName,
                userName,
                caption,
                image,
              });
              // send message to Telegram
              // sending the difference in km since last photo
              await bot.sendMessage(
                chatId,
                `You have done ${
                  caption - captionArray[captionArray.length - 1]
                } km since last reading`
              );
            } else {
              await bot.sendMessage(
                chatId,
                "The caption that you entered is lower than previously captioned"
              );
            }
          }
        });
        await bot.sendMessage(chatId, "Caption is correct it is a number");
      } else {
        await bot.sendMessage(
          chatId,
          "You have entered the incorrect caption it must only be numbers"
        );
      }
    } else {
      await bot.sendMessage(chatId, "There is no caption on the Photo");
    }

    // await postToDB(Photo, { firstName, lastName, userName, image });
  });

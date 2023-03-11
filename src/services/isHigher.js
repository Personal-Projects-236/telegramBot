// export const
import { postToDB } from "../utils/index.js";
import { captionArray } from "../services/index.js";

export const isHigher = async (botObject, db, res, caption) => {
  const { bot, chatId } = botObject;

  captionArray(res)[captionArray(res).length - 1] < caption
    ? (await postToDB(db)) ||
      (await bot.sendMessage(
        chatId,
        `You have done ${
          caption - captionArray(res)[captionArray(res).length - 1]
        } km since last reading`
      ))
    : await bot.sendMessage(
        chatId,
        "The caption that you entered is lower than previously captioned"
      );
};

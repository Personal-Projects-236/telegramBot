// models
import Rider from "../models/riderSchema.js";

// export const
import { postToDB, putToDB } from "../utils/index.js";
import { captionArray, handleServicing } from "../services/index.js";
import { higherBot, emoji } from "../services/index.js";

const post = async (db) => await postToDB(db);

const put = async (update) => await putToDB(update);

export const isHigher = async (botObject, db, res, caption) => {
  const { bot, chatId } = botObject;

  const update = {
    model: Rider,
    findUser: db.object.userName,
    updateObject: { lastKmTaken: db.object.caption },
  };

  await handleServicing(botObject, db);

  captionArray(res)[captionArray(res).length - 1] < caption
    ? await Promise.all([
        post(db),
        put(update),
        emoji(botObject),
        higherBot(botObject, caption, res),
      ])
    : await bot.sendMessage(
        chatId,
        "The caption that you entered is lower than previously captioned"
      );
};

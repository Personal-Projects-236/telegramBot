// models
import Rider from "../models/riderSchema.js";

// export const
import { postToDB, putToDB } from "../utils/index.js";
import { captionArray } from "../services/index.js";

export const isHigher = async (botObject, db, res, caption) => {
  const { bot, chatId } = botObject;

  const update = {
    model: Rider,
    findUser: db.object.userName,
    updateObject: { lastKmTaken: db.object.caption },
  };

  const data = (await postToDB(db)) || (await putToDB(update));
  const higherBot = await bot.sendMessage(
    chatId,
    `You have done ${
      caption - captionArray(res)[captionArray(res).length - 1]
    } km since last reading`
  );

  captionArray(res)[captionArray(res).length - 1] < caption
    ? await Promise.all([data, higherBot])
    : await bot.sendMessage(
        chatId,
        "The caption that you entered is lower than previously captioned"
      );
};

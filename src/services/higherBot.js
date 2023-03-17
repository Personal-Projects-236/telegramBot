import { captionArray } from "./captionArray.js";
import { averageArray } from "./averageArray.js";

export const higherBot = async (botObject, caption, res) => {
  const { bot, chatId } = botObject;

  return await bot.sendMessage(
    chatId,
    `You have done ${
      caption - captionArray(res)[captionArray(res).length - 1]
    } km since last reading, Your current average KM is: ${averageArray(
      captionArray(res)
    )} km`
  );
};

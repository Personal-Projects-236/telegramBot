import { getFromDB, putToDB } from "../utils/index.js";
import Rider from "../models/riderSchema.js";

export const handleServicing = async (botObject, db) => {
  const { bot, chatId } = botObject;
  const userName = { userName: db.object.userName };
  const caption = parseInt(db.object.caption);
  const nextService = await getFromDB(Rider, userName).then(async (res) => {
    return await res[0].nextService;
  });
  const difference = nextService - caption;
  const update = {
    model: Rider,
    findUser: db.object.userName,
    updateObject: { nextService: nextService + 3000 },
  };

  // if you are in the range 300 below and 300 above it will say you need to go for a service
  difference < 300 &&
    difference > -300 &&
    (await bot.sendMessage(chatId, `You are due for a service`));

  // if you go over the last service it will update service interval adding 3000 to it
  caption > nextService && (await putToDB(update));
};

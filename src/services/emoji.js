export const emoji = async (botObject) => {
  const { bot, chatId } = botObject;

  return await bot.sendMessage(chatId, JSON.parse('"\ud83d\ude0a"'));
};

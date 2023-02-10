export const botPhotos = (bot) =>
  bot.on("photo", (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "Photo Received");
  });

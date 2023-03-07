import dotenv from "dotenv";

dotenv.config();

export const keys = {
  port: process.env.PORT,
  mongo_connection: process.env.MONGODB,
  mongo_atlas_connection: process.env.MONGODB_ATLAS,
  telegram_token: process.env.TELEGRAM_BOT_TOKEN,
};

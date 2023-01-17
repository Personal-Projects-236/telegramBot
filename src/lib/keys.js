import dotenv from "dotenv";

dotenv.config();

export const keys = {
  port: process.env.PORT,
  mongo_connection: process.env.MONGODB,
};

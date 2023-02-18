import { model, Schema } from "mongoose";

const photoSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  caption: Number,
  photo: String,
  createdAt: String,
});

export default model("Photo", photoSchema);

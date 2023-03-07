import { model, Schema } from "mongoose";

const photoSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  caption: Number,
  image: String,
  createdAt: { type: Date, default: Date.now() },
});

const Photo = model("photo", photoSchema);
export default Photo;

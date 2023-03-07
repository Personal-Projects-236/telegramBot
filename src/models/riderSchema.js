import { model, Schema } from "mongoose";

const riderSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  lastKmTaken: String,
  nextService: { type: Number, default: 0 },
});

const Rider = model("rider", riderSchema);
export default Rider;

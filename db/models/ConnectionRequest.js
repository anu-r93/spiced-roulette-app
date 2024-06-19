import mongoose from "mongoose";
import User from "./User";

const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ["pending", "declined", "connected"],
    default: "pending",
  },
});

const ConnectionRequest =
  mongoose.models.ConnectionRequest ||
  mongoose.model("ConnectionRequest", connectionRequestSchema);

export default ConnectionRequest;

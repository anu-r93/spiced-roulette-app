import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  connections: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
  bio: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

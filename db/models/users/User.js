import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

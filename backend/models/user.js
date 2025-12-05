import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, default: "user", trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
  },
  { timestamps: true }
);

export default model("User", userSchema, "users");

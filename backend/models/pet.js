import { Schema, model } from "mongoose";

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    details: { type: String },
    image: { type: String },
    DOB: { type: Date },
    breed: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Neuter", "Other"] },
    category: { type: String, enum: ["dog", "cat", "rabit", "bird"] },
    posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    request_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default model("Pet", petSchema, "pets");

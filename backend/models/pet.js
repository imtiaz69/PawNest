import { Schema, model } from "mongoose";

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    details: { type: String },
    image: { type: String },
    DOB: { type: Date },
    breed: { type: String },
    location: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Neuter", "Other"] },
    category: { type: String, enum: ["dog", "cat", "rabit", "bird"] },
    posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    request_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    adopted_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
    status: {
      type: String,
      enum: ["available", "pending", "adopted"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default model("Pet", petSchema, "pets");

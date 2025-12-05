import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import Pet from "../models/pet.js";
import User from "../models/user.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/create-post", upload.single("image"), async (req, res) => {
  const { name, details, DOB, breed, gender, category, posted_by } = req.body;

  try {
    const newPost = await Pet.create({
      name,
      details,
      image: req.file.path,
      DOB,
      breed,
      gender,
      category,
      posted_by,
    });

    await User.findByIdAndUpdate(posted_by, {
      $push: { posts: newPost._id },
    });

    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/all-post", async (req, res) => {
  try {
    const posts = await Pet.find();
    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/update-status", async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res
      .status(400)
      .json({ success: false, message: "ID and status are required." });
  }

  try {
    const updatedPost = await Pet.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Pet not found." });
    }

    res.status(200).json({ success: true, updatedPost });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/adopt-request", async (req, res) => {
  const { id, user_id } = req.body;

  if (!id || !user_id) {
    return res
      .status(400)
      .json({ success: false, message: "Pet ID and User ID are required." });
  }

  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      { $addToSet: { request_by: user_id } },
      { new: true }
    );

    if (!updatedPet) {
      return res
        .status(404)
        .json({ success: false, message: "Pet not found." });
    }

    res.status(200).json({ success: true, updatedPet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

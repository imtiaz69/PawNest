import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Pet from "../models/pet.js";

const router = Router();

// POST /api/user/register
router.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error",
      details: err.message,
    });
  }
});

// POST /api/user/login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Phone and password are required" });
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid phone or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid phone or password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        user_id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server error", details: err.message });
  }
});

// POST /api/user/profile
router.post("/profile", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, error: "user_id is required" });
  }

  try {
    const user = await User.findById(user_id).populate("posts");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Process posts and attach requesters' info
    const postsWithRequesters = await Promise.all(
      user.posts.map(async (post) => {
        if (post.request_by && post.request_by.length > 0) {
          const requesters = await User.find({
            _id: { $in: post.request_by },
          }).select("name phone email");

          return {
            ...post.toObject(),
            requesters, // add requester details
          };
        } else {
          return post;
        }
      })
    );

    res.json({
      success: true,
      user: {
        user_id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        posts: postsWithRequesters,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server error", details: err.message });
  }
});

export default router;

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const passwordStr = String(password);
    const hashedPassword = await bcryptjs.hash(passwordStr, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(400).json({ message: "User could not be created" });
    }
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",

        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error?.message);
    res.status(500).json({ message: "Server error" });
  }
};

// login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordStr = String(password);
    const isPasswordValid = await bcryptjs.compare(passwordStr, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (isPasswordValid) {
      generateToken(user._id, res);
      res.status(200).json({
        message: "User logged in successfully",
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.log("Error in login controller", error?.message);
    res.status(500).json({ message: "Server error" });
  }
};
// logout
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error?.message);
    res.status(500).json({ message: "Server error" });
  }
};

// update profile
export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    const userId = req.user._id;

    if (!profilePic) {
      res.status(400).json({ message: "Profile picture is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log("Error in update profile controller", error?.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error?.message);
    res.status(500).json({ message: "Server error" });
  }
};

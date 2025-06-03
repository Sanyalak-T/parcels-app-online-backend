// import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models/User.js";

// register a new user controller
export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400).json({
      error: true,
      message: "All fields are required",
    });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "Email already in use.",
      });
    }

    const user = new User({ userName, email, password });
    await user.save();
    res.status(201).json({
      error: false,
      message: "User register succussfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// login a user - jwt signed token controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials - user not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials - password not match",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      error: false,
      token,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// Logout controller
export const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

// get users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort("-createdOn");
    res.status(200).json({
      error: false,
      users,
      message: "All users retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch users",
      details: err.message,
    });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(204).json({ message: "delete a user successfully" }).end();
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to delete a user",
      details: err.message,
    });
  }
};

// update or change password a user
export const updatePasswordUser = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const email = req.user.email;

  const user = await User.findOne({ email });
  //   console.log(user);
  if (!user) {
    return res.status(404).json({
      error: false,
      message: "User not found",
    });
  }

  const userMatch = await bcrypt.compare(currentPassword, user.password);
  console.log(userMatch);
  if (!userMatch) {
    return res.status(400).json({
      error: false,
      message: "Current password is incorrect",
    });
  }

  try {
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      error: false,
      message: "update password successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to update password",
      details: err.error,
    });
  }
};

// forgot password a user with reset password.
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Email และ Password ต้องไม่ว่าง",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid or Not match email",
      });
    }

    user.password = password;
    await user.save();

    res.status(200).json({
      error: false,
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Error resetting password",
      details: err.message,
    });
  }
};

// profile a user
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.user._id).select("-password"); //exclude password
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }
  res.status(200).json({
    error: false,
    user,
  });
};

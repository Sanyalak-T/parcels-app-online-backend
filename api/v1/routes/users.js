import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser,
  resetPassword,
  updatePasswordUser,
} from "../controllers/userController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

// register a new user
router.post("/auth/register", createUser);

// login a user - jwt signed token
router.post("/auth/login", loginUser);

// Logout
router.post("/auth/logout", logoutUser);

// get users
router.get("/auth/users", getUsers);

// delete a user
router.delete("/auth/users/:id", deleteUser);

// update password a user
router.post("/auth/users/update-password", authUser, updatePasswordUser);

// reset password
router.post("/auth/reset-password", resetPassword);

export default router;

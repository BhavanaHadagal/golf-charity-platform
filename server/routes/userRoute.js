import express from "express";
import authUser from "../middleware/authUser.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  loginUser,
  registerUser,
  adminLogin,
  getCurrentUser,
  listUsers,
  updateUserRole
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/me", authUser, getCurrentUser);
userRouter.get("/list", adminAuth, listUsers);
userRouter.post("/update-role", adminAuth, updateUserRole);

export default userRouter;
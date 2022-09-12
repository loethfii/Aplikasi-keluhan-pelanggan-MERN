import express from "express";
import {
  GetUsers,
  SaveUser,
  GetUserById,
  EditUser,
  DeleteUser,
  LoginUser,
  UserProfile,
} from "../controllers/UserController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/user", GetUsers);
router.get("/user/:id", GetUserById);
router.post("/user", SaveUser);
router.patch("/user/:id", EditUser);
router.delete("/user/:id", DeleteUser);
router.get("/profile", UserProfile);

export default router;

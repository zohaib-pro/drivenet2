// routes/users.js

import express from "express";
import { 
  getUser, 
  getUserFriends, 
  addRemoveFriend, 
  updateUser,
  changePassword, 
  handleBlocking
} from "../controllers/users.js";
import { verifyToken, verifyTokenForPasswordChange } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id/changePass", verifyTokenForPasswordChange, changePassword);
router.patch("/:id/blocking", handleBlocking);

export default router;

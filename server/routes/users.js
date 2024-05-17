// routes/users.js

import express from "express";
import { 
  getUser, 
  getUserFriends, 
  addRemoveFriend, 
  updateUser,
  changePassword 
} from "../controllers/users.js";
import { verifyToken, verifyTokenForPasswordChange } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id/changePass", verifyTokenForPasswordChange, changePassword);

export default router;

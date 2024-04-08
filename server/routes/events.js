import express from "express";
import { getEvents, deleteEvent } from "../controllers/events.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getEvents);

/* DELETE */
router.delete("/:id", verifyToken, deleteEvent);

export default router;

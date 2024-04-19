import express from "express";
import { getEvents, deleteEvent, interestEvent } from "../controllers/events.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getEvents);

/* INTEREST */
router.patch("/:eventId/interest", verifyToken, interestEvent);


/* DELETE */
router.delete("/:id", verifyToken, deleteEvent);

export default router;

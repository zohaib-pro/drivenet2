import express from "express";
import { createIssue, getIssues, deleteIssue } from "../controllers/issues.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getIssues);

/* WRITE */
router.post("/", createIssue);

/* DELETE */
router.delete("/:id", verifyToken, deleteIssue);

export default router;

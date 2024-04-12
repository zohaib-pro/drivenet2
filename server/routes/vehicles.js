import express from "express";
import {getVehicleMakes, getVehicleModels} from "../controllers/vehicles.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getVehicleMakes);
router.get("/:make", getVehicleModels);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likeVehicleAd);

export default router;

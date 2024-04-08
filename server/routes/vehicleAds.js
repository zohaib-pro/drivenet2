import express from "express";
import { getVehicleAds, getUserVehicleAds, getVehicleAd } from "../controllers/vehicleAds.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getVehicleAds);
router.get("/:vehicleAdId", getVehicleAd)
router.get("/:userId/vehicleAds", verifyToken, getUserVehicleAds);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likeVehicleAd);

export default router;

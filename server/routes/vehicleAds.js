import express from "express";
import { getVehicleAds, getUserVehicleAds, getVehicleAd, delVehicleAd } from "../controllers/vehicleAds.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getVehicleAds);
router.get("/:vehicleAdId", getVehicleAd)
router.get("/:userId/ads", getUserVehicleAds);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likeVehicleAd);

router.delete("/:vehicleAdId", delVehicleAd);

export default router;

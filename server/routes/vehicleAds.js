import express from "express";
import { getVehicleAds, getUserVehicleAds, getVehicleAd, delVehicleAd, setVehicleStatus, getVehicleAdsAll } from "../controllers/vehicleAds.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getVehicleAds);
router.get("/all", getVehicleAdsAll);
router.get("/:vehicleAdId", getVehicleAd)
router.get("/:userId/ads", getUserVehicleAds);

/* UPDATE */
// router.patch("/:id/like", verifyToken, likeVehicleAd);
router.patch("/status/:vehicleAdId", setVehicleStatus)

/* DELETE */
router.delete("/:vehicleAdId", delVehicleAd);

export default router;

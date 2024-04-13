import express from "express";
import {getVehicleMakes, getVehicleModels, addVehicleDetails, getVehicleDetails} from "../controllers/vehicles.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getVehicleMakes);
router.get("/:make", getVehicleModels);
router.get("/:make/:model/:variant", getVehicleDetails);

/* UPDATE */
router.put("/:make/:model", addVehicleDetails);


export default router;

import express from "express";

import {
  getLocationAdvantage,
  saveLocationAdvantage,
} from "../controllers/locationAdvantageController";

const router = express.Router();

/**
 * Get
 */
router.get(
  "/",
  getLocationAdvantage
);

/**
 * Save
 */
router.put(
  "/",
  saveLocationAdvantage
);

export default router;
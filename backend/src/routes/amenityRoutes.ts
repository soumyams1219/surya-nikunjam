import express from "express";

import { protect } from "../middlewares/authMiddleware";
import upload from "../middlewares/amenityUpload";

import {
  getAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  toggleAmenityStatus,
} from "../controllers/amenityController";

const router = express.Router();

/* Public */
router.get("/", getAmenities);

router.get("/:id", getAmenityById);

/* Admin */
router.post(
  "/",
  protect,
  upload.single("image"),
  createAmenity
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateAmenity
);

router.delete(
  "/:id",
  protect,
  deleteAmenity
);

router.patch(
  "/:id/status",
  protect,
  toggleAmenityStatus
);

export default router;
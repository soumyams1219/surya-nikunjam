import { Router } from "express";

import {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
  toggleGalleryStatus,
} from "../controllers/galleryController";

import upload from "../middlewares/galleryUpload";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

/* Public */
router.get("/", getGallery);
router.get("/:id", getGalleryById);

/* Admin */
router.post(
  "/",
  protect,
  upload.single("image"),
  createGallery
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateGallery
);

router.delete(
  "/:id",
  protect,
  deleteGallery
);

router.patch(
  "/:id/toggle",
  protect,
  toggleGalleryStatus
);

export default router;
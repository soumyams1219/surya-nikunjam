import express from "express";

import upload from "../middlewares/upload";

import { protect } from "../middlewares/authMiddleware";

import {
  createBanner,
  getAllBanners,
  getPublicBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  toggleBannerStatus
} from "../controllers/bannerController";

const router = express.Router();

router.get("/", protect, getAllBanners);

router.post(
  "/",
  protect,
  upload.single("image"),
  createBanner
);
router.get("/public-banners", getPublicBanners);
router.get("/:id", protect, getBannerById);
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateBanner
);
router.delete("/:id", protect, deleteBanner);
router.patch(
  "/:id/status",
  protect,
  toggleBannerStatus
);

export default router;
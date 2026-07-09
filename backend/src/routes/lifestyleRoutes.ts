import { Router } from "express";

import upload from "../middlewares/uploadLifestyle";

import {
  getLifestyles,
  getLifestyle,
  createLifestyle,
  updateLifestyle,
  deleteLifestyle,
  toggleLifestyleStatus,
} from "../controllers/lifestyleController";

import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getLifestyles);

router.get("/:id", getLifestyle);

router.post(
  "/",
  protect,
  upload.single("image"),
  createLifestyle
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateLifestyle
);

router.delete(
  "/:id",
  protect,
  deleteLifestyle
);

router.patch(
  "/:id/status",
  protect,
  toggleLifestyleStatus
);

export default router;
import { Router } from "express";
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
} from "../controllers/testimonialController";

import upload from "../middlewares/testimonialUpload";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);

router.post(
  "/",
  protect,
  upload.single("image"),
  createTestimonial
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateTestimonial
);

router.delete(
  "/:id",
  protect,
  deleteTestimonial
);

router.patch(
  "/:id/toggle",
  protect,
  toggleTestimonialStatus
);

export default router;
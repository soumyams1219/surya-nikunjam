import { Router } from "express";

import {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  toggleFAQStatus,
} from "../controllers/faqController";

import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getFAQs);

router.get("/:id", getFAQ);

router.post(
  "/",
  protect,
  createFAQ
);

router.put(
  "/:id",
  protect,
  updateFAQ
);

router.delete(
  "/:id",
  protect,
  deleteFAQ
);

router.patch(
  "/:id/status",
  protect,
  toggleFAQStatus
);

export default router;
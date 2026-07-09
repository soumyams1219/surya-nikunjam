import { Router } from "express";

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleEventStatus,
} from "../controllers/eventController";

import upload from "../middlewares/eventUpload";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

/* Public */
router.get("/", getEvents);
router.get("/:id", getEventById);

/* Admin */
router.post(
  "/",
  protect,
  upload.single("image"),
  createEvent
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  deleteEvent
);

router.patch(
  "/:id/toggle",
  protect,
  toggleEventStatus
);

export default router;
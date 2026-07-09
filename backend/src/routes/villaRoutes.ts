import { Router } from "express";

import upload from "../middlewares/uploadVilla";

import {
  getVillas,
  getVilla,
  createVilla,
  updateVilla,
  deleteVilla,
  toggleVillaStatus,
} from "../controllers/villaController";

import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getVillas);

router.get("/:id", getVilla);

router.post(
  "/",
  protect,
  upload.single("image"),
  createVilla
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateVilla
);

router.delete(
  "/:id",
  protect,
  deleteVilla
);

router.patch(
  "/:id/status",
  protect,
  toggleVillaStatus
);

export default router;
import { Router } from "express";

import {
  getContact,
  saveContact,
} from "../controllers/contactController";

import { protect } from "../middlewares/authMiddleware";

const router = Router();

/**
 * Public
 */
router.get("/", getContact);

/**
 * Admin
 */
router.put(
  "/",
  protect,
  saveContact
);

export default router;
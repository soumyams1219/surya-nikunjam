import express from "express";
import {
  getWhyChoose,
  createWhyChoose,
  updateWhyChoose,
  deleteWhyChoose,toggleWhyChooseStatus,getWhyChooseById
} from "../controllers/whyChooseController";

import upload from "../middlewares/whyChooseUpload";

const router = express.Router();

router.get("/", getWhyChoose);
router.get("/:id", getWhyChooseById);

router.post("/", upload.single("icon"), createWhyChoose);

router.put("/:id", upload.single("icon"), updateWhyChoose);

router.delete("/:id", deleteWhyChoose);
router.patch("/:id/toggle", toggleWhyChooseStatus);

export default router;
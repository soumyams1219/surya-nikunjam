import express from "express";
import {
  getAbout,
  saveAbout,
} from "../controllers/aboutController";

import uploadAbout from "../middlewares/uploadAbout";

const router = express.Router();

router.get("/", getAbout);

router.put(
  "/",
  uploadAbout.fields([
    {
      name: "welcomeImage",
      maxCount: 1,
    },
    {
      name: "aboutImage",
      maxCount: 1,
    },
  ]),
  saveAbout
);

export default router;
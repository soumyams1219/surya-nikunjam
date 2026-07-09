import express from "express";

import {
  createSiteVisit,
  getSiteVisits,
  getSiteVisit,
  updateSiteVisitStatus,
  deleteSiteVisit,
} from "../controllers/siteVisitController";

const router = express.Router();

/**
 * Public
 */

router.post("/", createSiteVisit);

/**
 * Admin
 */

router.get("/", getSiteVisits);

router.get("/:id", getSiteVisit);

router.patch(
  "/:id/status",
  updateSiteVisitStatus
);

router.delete("/:id", deleteSiteVisit);

export default router;
import { Request, Response } from "express";

import Villa from "../models/Villa";
import WhyChoose from "../models/WhyChoose";
import SiteVisit from "../models/SiteVisit";
import Testimonial from "../models/Testimonial";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const [
      villas,
      whyChoose,
      siteVisits,
      testimonials,
      recentSiteVisits,
    ] = await Promise.all([
      Villa.countDocuments(),

      WhyChoose.countDocuments(),

      SiteVisit.countDocuments(),
      Testimonial.countDocuments(),

      SiteVisit.find()
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        villas,

        whyChoose,

        siteVisits,

        testimonials,
      },

      recentSiteVisits,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};
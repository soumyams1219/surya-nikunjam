import { Request, Response } from "express";
import SiteVisit from "../models/SiteVisit";

/**
 * Submit Site Visit Request
 */
export const createSiteVisit = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      phone,
      email,
      visitDate,
      visitTime,
      message,
    } = req.body;

    const visit = await SiteVisit.create({
      name,
      phone,
      email,
      visitDate,
      visitTime,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Site visit booked successfully.",
      visit,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to book site visit.",
    });
  }
};

/**
 * Get All Site Visits
 */
export const getSiteVisits = async (
  req: Request,
  res: Response
) => {
  try {
    const visits = await SiteVisit.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      visits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch site visits.",
    });
  }
};

/**
 * Get Single Site Visit
 */
export const getSiteVisit = async (
  req: Request,
  res: Response
) => {
  try {
    const visit = await SiteVisit.findById(
      req.params.id
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Site visit not found.",
      });
    }

    res.json({
      success: true,
      visit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch site visit.",
    });
  }
};

/**
 * Update Status
 */
export const updateSiteVisitStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.body;

    const visit =
      await SiteVisit.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Site visit not found.",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully.",
      visit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status.",
    });
  }
};

/**
 * Delete Site Visit
 */
export const deleteSiteVisit = async (
  req: Request,
  res: Response
) => {
  try {
    const visit =
      await SiteVisit.findByIdAndDelete(
        req.params.id
      );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Site visit not found.",
      });
    }

    res.json({
      success: true,
      message: "Site visit deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed.",
    });
  }
};
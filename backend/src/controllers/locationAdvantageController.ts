import { Request, Response } from "express";
import LocationAdvantage from "../models/LocationAdvantage";

/**
 * GET Location Advantage
 */
export const getLocationAdvantage = async (
  req: Request,
  res: Response
) => {
  try {
    const locationAdvantage =
      await LocationAdvantage.findOne();

    res.status(200).json({
      success: true,
      locationAdvantage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch Location Advantage.",
    });
  }
};

/**
 * Create / Update Location Advantage
 */
export const saveLocationAdvantage = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      nearby,
      isActive,
    } = req.body;

    let nearbyArray: string[] = [];

    if (Array.isArray(nearby)) {
      nearbyArray = nearby;
    } else if (typeof nearby === "string") {
      nearbyArray = nearby
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    let locationAdvantage =
      await LocationAdvantage.findOne();

    if (!locationAdvantage) {
      locationAdvantage =
        await LocationAdvantage.create({
          title,
          description,
          nearby: nearbyArray,
          isActive:
            isActive === "true" ||
            isActive === true,
        });
    } else {
      locationAdvantage.title = title;

      locationAdvantage.description =
        description;

      locationAdvantage.nearby =
        nearbyArray;

      locationAdvantage.isActive =
        isActive === "true" ||
        isActive === true;

      await locationAdvantage.save();
    }

    res.status(200).json({
      success: true,
      message:
        "Location Advantage saved successfully.",
      locationAdvantage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to save Location Advantage.",
    });
  }
};
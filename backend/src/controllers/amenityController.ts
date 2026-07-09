import { Request, Response } from "express";
import Amenity from "../models/Amenity";

export const getAmenities = async (
  req: Request,
  res: Response
) => {
  try {
    const amenities = await Amenity.find().sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      amenities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch amenities.",
    });
  }
};

export const getAmenityById = async (
  req: Request,
  res: Response
) => {
  try {
    const amenity = await Amenity.findById(
      req.params.id
    );

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    res.status(200).json({
      success: true,
      amenity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch amenity.",
    });
  }
};

export const createAmenity = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      order,
      isActive,
    } = req.body;

    /*if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Amenity image is required.",
      });
    }*/
   const file = req.file as Express.Multer.File;
   const image = file
      ? `/uploads/amenities/${file.filename}`
      : "";

    const amenity = await Amenity.create({
      title,
      description,
      image,
      order,
      isActive:
        isActive === "true" || isActive === true,
    });

    res.status(201).json({
      success: true,
      message: "Amenity created successfully.",
      amenity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create amenity.",
    });
  }
};

export const updateAmenity = async (
  req: Request,
  res: Response
) => {
  try {
    const amenity = await Amenity.findById(
      req.params.id
    );

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    amenity.title = req.body.title;
    amenity.description = req.body.description;
    amenity.order = Number(req.body.order);
    amenity.isActive =
      req.body.isActive === "true" ||
      req.body.isActive === true;

    if (req.file) {
      amenity.image = `/uploads/amenities/${req.file.filename}`;
    }

    await amenity.save();

    res.status(200).json({
      success: true,
      message: "Amenity updated successfully.",
      amenity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update amenity.",
    });
  }
};

export const deleteAmenity = async (
  req: Request,
  res: Response
) => {
  try {
    const amenity = await Amenity.findById(
      req.params.id
    );

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    await amenity.deleteOne();

    res.status(200).json({
      success: true,
      message: "Amenity deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete amenity.",
    });
  }
};

export const toggleAmenityStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const amenity = await Amenity.findById(
      req.params.id
    );

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    amenity.isActive = !amenity.isActive;

    await amenity.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      amenity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status.",
    });
  }
};
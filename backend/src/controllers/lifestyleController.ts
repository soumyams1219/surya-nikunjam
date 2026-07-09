import { Request, Response } from "express";
import Lifestyle from "../models/Lifestyle";

// Get All

export const getLifestyles = async (
  req: Request,
  res: Response
) => {
  try {
    const lifestyles =
      await Lifestyle.find().sort({
        order: 1,
      });

    res.json({
      success: true,
      lifestyles,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lifestyle.",
    });
  }
};

// Get One

export const getLifestyle = async (
  req: Request,
  res: Response
) => {
  try {
    const lifestyle =
      await Lifestyle.findById(
        req.params.id
      );

    if (!lifestyle) {
      return res.status(404).json({
        success: false,
        message: "Lifestyle not found.",
      });
    }

    res.json({
      success: true,
      lifestyle,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Create

export const createLifestyle = async (
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
        message: "Image is required.",
      });
    }*/
    const file = req.file as Express.Multer.File;
   const image = file
      ? "/uploads/lifestyle/" +
          file.filename
      : "";

    const lifestyle =
      await Lifestyle.create({
        title,
        description,
        order,
        isActive,
        image
      });

    res.status(201).json({
      success: true,
      message:
        "Lifestyle created successfully.",
      lifestyle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to create lifestyle.",
    });
  }
};

// Update

export const updateLifestyle = async (
  req: Request,
  res: Response
) => {
  try {
    const lifestyle =
      await Lifestyle.findById(
        req.params.id
      );

    if (!lifestyle) {
      return res.status(404).json({
        success: false,
        message: "Lifestyle not found.",
      });
    }

    lifestyle.title =
      req.body.title;

    lifestyle.description =
      req.body.description;

    lifestyle.order =
      req.body.order;

    lifestyle.isActive =
      req.body.isActive;

    if (req.file) {
      lifestyle.image =
        "/uploads/lifestyle/" +
        req.file.filename;
    }

    await lifestyle.save();

    res.json({
      success: true,
      message:
        "Lifestyle updated successfully.",
      lifestyle,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Failed to update lifestyle.",
    });
  }
};

// Delete

export const deleteLifestyle = async (
  req: Request,
  res: Response
) => {
  try {
    await Lifestyle.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Lifestyle deleted successfully.",
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Delete failed.",
    });
  }
};

// Toggle Status

export const toggleLifestyleStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lifestyle =
        await Lifestyle.findById(
          req.params.id
        );

      if (!lifestyle) {
        return res.status(404).json({
          success: false,
          message:
            "Lifestyle not found.",
        });
      }

      lifestyle.isActive =
        !lifestyle.isActive;

      await lifestyle.save();

      res.json({
        success: true,
        lifestyle,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Status update failed.",
      });
    }
  };
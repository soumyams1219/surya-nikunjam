import { Request, Response } from "express";
import Gallery from "../models/Gallery";
import fs from "fs";
import path from "path";

export const getGallery = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery = await Gallery.find().sort({
      order: 1,
    });

    res.json({
      success: true,
      gallery,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery.",
    });
  }
};

export const getGalleryById = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery = await Gallery.findById(
      req.params.id
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    res.json({
      success: true,
      gallery,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const createGallery = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery =
      await Gallery.create({
        ...req.body,
        image: req.file
          ? `/uploads/gallery/${req.file.filename}`
          : "",
      });

    res.status(201).json({
      success: true,
      gallery,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create gallery.",
    });
  }
};

export const updateGallery = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery =
      await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
      });
    }

    if (req.file) {
      if (gallery.image) {
        const oldImage = path.join(
          __dirname,
          "../../",
          gallery.image
        );

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      gallery.image = `/uploads/gallery/${req.file.filename}`;
    }

    gallery.title = req.body.title;
    gallery.category =
      req.body.category;
    gallery.order = req.body.order;
    gallery.isActive =
      req.body.isActive;

    await gallery.save();

    res.json({
      success: true,
      gallery,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteGallery = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery =
      await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
      });
    }

    if (gallery.image) {
      const imagePath = path.join(
        __dirname,
        "../../",
        gallery.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await gallery.deleteOne();

    res.json({
      success: true,
      message:
        "Gallery deleted successfully.",
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const toggleGalleryStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const gallery =
        await Gallery.findById(
          req.params.id
        );

      if (!gallery) {
        return res.status(404).json({
          success: false,
        });
      }

      gallery.isActive =
        !gallery.isActive;

      await gallery.save();

      res.json({
        success: true,
        gallery,
      });
    } catch {
      res.status(500).json({
        success: false,
      });
    }
  };
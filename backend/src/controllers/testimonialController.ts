import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import Testimonial from "../models/Testimonial";

// ===============================
// Get All Testimonials
// ===============================
export const getTestimonials = async (
  req: Request,
  res: Response
) => {
  try {
    const testimonials = await Testimonial.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials.",
    });
  }
};

// ===============================
// Get Single Testimonial
// ===============================
export const getTestimonialById = async (
  req: Request,
  res: Response
) => {
  try {
    const testimonial = await Testimonial.findById(
      req.params.id
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial.",
    });
  }
};

// ===============================
// Create Testimonial
// ===============================
export const createTestimonial = async (
  req: Request,
  res: Response
) => {
  try {
    const testimonial =
      await Testimonial.create({
        name: req.body.name,
        designation:
          req.body.designation,
        message: req.body.message,
        rating: Number(req.body.rating),
        featured:
          req.body.featured === "true",
        order: Number(req.body.order),
        isActive:
          req.body.isActive === "true",
        image: req.file
          ? `/uploads/testimonials/${req.file.filename}`
          : "",
      });

    res.status(201).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create testimonial.",
    });
  }
};

// ===============================
// Update Testimonial
// ===============================
export const updateTestimonial = async (
  req: Request,
  res: Response
) => {
  try {
    const testimonial =
      await Testimonial.findById(
        req.params.id
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    // Delete old image
    if (req.file) {
      if (testimonial.image) {
        const oldImagePath = path.join(
          __dirname,
          "../../",
          testimonial.image
        );

        if (
          fs.existsSync(oldImagePath)
        ) {
          fs.unlinkSync(oldImagePath);
        }
      }

      testimonial.image = `/uploads/testimonials/${req.file.filename}`;
    }

    testimonial.name = req.body.name;
    testimonial.designation =
      req.body.designation;
    testimonial.message =
      req.body.message;
    testimonial.rating = Number(
      req.body.rating
    );
    testimonial.featured =
      req.body.featured === "true";
    testimonial.order = Number(
      req.body.order
    );
    testimonial.isActive =
      req.body.isActive === "true";

    await testimonial.save();

    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update testimonial.",
    });
  }
};

// ===============================
// Delete Testimonial
// ===============================
export const deleteTestimonial = async (
  req: Request,
  res: Response
) => {
  try {
    const testimonial =
      await Testimonial.findById(
        req.params.id
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    // Delete image
    if (testimonial.image) {
      const imagePath = path.join(
        __dirname,
        "../../",
        testimonial.image
      );

      if (
        fs.existsSync(imagePath)
      ) {
        fs.unlinkSync(imagePath);
      }
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete testimonial.",
    });
  }
};

// ===============================
// Toggle Status
// ===============================
export const toggleTestimonialStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const testimonial =
        await Testimonial.findById(
          req.params.id
        );

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message:
            "Testimonial not found.",
        });
      }

      testimonial.isActive =
        !testimonial.isActive;

      await testimonial.save();

      res.status(200).json({
        success: true,
        testimonial,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update status.",
      });
    }
  };
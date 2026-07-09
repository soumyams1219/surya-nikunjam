import { Request, Response } from "express";
import FAQ from "../models/FAQ";

// Get All FAQs
export const getFAQs = async (
  req: Request,
  res: Response
) => {
  try {
    const faqs = await FAQ.find().sort({
      order: 1,
    });

    res.json({
      success: true,
      faqs,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs.",
    });
  }
};

// Get One FAQ
export const getFAQ = async (
  req: Request,
  res: Response
) => {
  try {
    const faq = await FAQ.findById(
      req.params.id
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    res.json({
      success: true,
      faq,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Create FAQ
export const createFAQ = async (
  req: Request,
  res: Response
) => {
  try {
    const faq = await FAQ.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "FAQ created successfully.",
      faq,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Failed to create FAQ.",
    });
  }
};

// Update FAQ
export const updateFAQ = async (
  req: Request,
  res: Response
) => {
  try {
    const faq =
      await FAQ.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    res.json({
      success: true,
      message:
        "FAQ updated successfully.",
      faq,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Failed to update FAQ.",
    });
  }
};

// Delete FAQ
export const deleteFAQ = async (
  req: Request,
  res: Response
) => {
  try {
    await FAQ.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "FAQ deleted successfully.",
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
export const toggleFAQStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const faq = await FAQ.findById(
        req.params.id
      );

      if (!faq) {
        return res.status(404).json({
          success: false,
          message:
            "FAQ not found.",
        });
      }

      faq.isActive =
        !faq.isActive;

      await faq.save();

      res.json({
        success: true,
        faq,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Status update failed.",
      });
    }
  };
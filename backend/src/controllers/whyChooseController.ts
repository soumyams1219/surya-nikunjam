import { Request, Response } from "express";
import WhyChoose from "../models/WhyChoose";

export const getWhyChoose = async (req: Request, res: Response) => {
  try {
    const data = await WhyChoose.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
};
export const createWhyChoose = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const file = req.file as Express.Multer.File;

    const icon = file
      ? `/uploads/whychoose/${file.filename}`
      : "";

      if (!title || !description) {
  return res.status(400).json({
    success: false,
    message: "Title and Description are required.",
  });
}
    const data = await WhyChoose.create({
      title,
      description,
      icon,
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create",
    });
  }
};
export const updateWhyChoose = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const file = req.file as Express.Multer.File;

    const updateData: any = {
      title: req.body.title,
      description: req.body.description,
      isActive: req.body.isActive === "true",
    };

    if (file) {
      updateData.icon = `/uploads/whychoose/${file.filename}`;
    }

    const updated = await WhyChoose.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};
export const deleteWhyChoose = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await WhyChoose.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
export const toggleWhyChooseStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const item = await WhyChoose.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.isActive = !item.isActive;

    await item.save();

    res.json({
      success: true,
      message: "Status updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Toggle failed",
    });
  }
};
export const getWhyChooseById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const item = await WhyChoose.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Why Choose item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch item",
    });
  }
};
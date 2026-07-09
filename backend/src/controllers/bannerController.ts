import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import Banner from "../models/Banner";

export const createBanner = async (
  req: Request,
  res: Response
) => {
  try {
    const banner = await Banner.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,

      image: req.file
        ? `/uploads/banners/${req.file.filename}`
        : "",

      buttonText: req.body.buttonText,

      buttonLink: req.body.buttonLink,

      order: req.body.order,

      isActive: req.body.isActive,
    });

    res.status(201).json({
      success: true,
      banner,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getAllBanners = async (
  req: Request,
  res: Response
) => {
  try {
    const banners = await Banner.find().sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      count: banners.length,
      banners,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};
export const getPublicBanners = async (
  req: Request,
  res: Response
) => {
  try {
    const banners = await Banner.find({
      isActive: true,
    }).sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};
export const getBannerById = async (
  req: Request,
  res: Response
) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateBanner = async (
  req: Request,
  res: Response
) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    if (req.file) {
      const oldImage = path.join(
        process.cwd(),
        banner.image.replace("/", "")
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      banner.image = `/uploads/banners/${req.file.filename}`;
    }

    banner.title = req.body.title;
    banner.subtitle = req.body.subtitle;
    banner.description = req.body.description;
    banner.buttonText = req.body.buttonText;
    banner.buttonLink = req.body.buttonLink;
    banner.order = Number(req.body.order);
    banner.isActive = req.body.isActive === "true";

    await banner.save();

    res.json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteBanner = async (
  req: Request,
  res: Response
) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const imagePath = path.join(
      process.cwd(),
      banner.image.replace("/", "")
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await banner.deleteOne();

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const toggleBannerStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    banner.isActive = !banner.isActive;

    await banner.save();

    res.json({
      success: true,
      message: "Status updated",
      isActive: banner.isActive,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
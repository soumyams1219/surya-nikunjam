import { Request, Response } from "express";
import About from "../models/About";

/**
 * GET About
 */
export const getAbout = async (
  req: Request,
  res: Response
) => {
  try {
    const about = await About.findOne();

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch About content.",
    });
  }
};

/**
 * Create / Update About
 */
export const saveAbout = async (
  req: Request,
  res: Response
) => {
  try {

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    //console.log("FILES:", req.files);
//console.log("BODY:", req.body);
    const welcomeImage =
      files?.welcomeImage?.[0]
        ? `/uploads/about/${files.welcomeImage[0].filename}`
        : undefined;

    const aboutImage =
      files?.aboutImage?.[0]
        ? `/uploads/about/${files.aboutImage[0].filename}`
        : undefined;

    const {
      welcomeTitle,
      welcomeSubtitle,
      welcomeDescription,

      aboutTitle,
      aboutDescription,

      visionTitle,
      visionDescription,

      missionTitle,
      missionDescription,

      buttonText,
      buttonLink,

      isActive,
    } = req.body;

    let about = await About.findOne();

    if (!about) {

      about = await About.create({

        welcomeTitle,
        welcomeSubtitle,
        welcomeDescription,
        welcomeImage: welcomeImage || "",

        aboutTitle,
        aboutDescription,
        aboutImage: aboutImage || "",

        visionTitle,
        visionDescription,

        missionTitle,
        missionDescription,

        buttonText,
        buttonLink,

        isActive:
          isActive === "true" ||
          isActive === true,
      });

    } else {

      about.welcomeTitle =
        welcomeTitle;

      about.welcomeSubtitle =
        welcomeSubtitle;

      about.welcomeDescription =
        welcomeDescription;

      if (welcomeImage) {
        about.welcomeImage =
          welcomeImage;
      }

      about.aboutTitle =
        aboutTitle;

      about.aboutDescription =
        aboutDescription;

      if (aboutImage) {
        about.aboutImage =
          aboutImage;
      }

      about.visionTitle =
        visionTitle;

      about.visionDescription =
        visionDescription;

      about.missionTitle =
        missionTitle;

      about.missionDescription =
        missionDescription;

      about.buttonText =
        buttonText;

      about.buttonLink =
        buttonLink;

      about.isActive =
        isActive === "true" ||
        isActive === true;

      await about.save();
    }

    res.status(200).json({
      success: true,
      message:
        "About content saved successfully.",
      about,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to save About content.",
    });

  }
};
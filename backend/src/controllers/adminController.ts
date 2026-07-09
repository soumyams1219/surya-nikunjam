import { Request, Response } from "express";
import Admin from "../models/Admin";
import generateToken from "../utils/generateToken";

export const loginAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    console.log("Admin:", admin);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      token: generateToken(String(admin._id)),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const secret =
      req.headers["x-setup-secret"];

      //console.log("Received Secret:", req.headers["x-setup-secret"]);
      //console.log("Expected Secret:", process.env.SETUP_SECRET);
    if (
      secret !== process.env.SETUP_SECRET
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid setup secret.",
      });
    }

    const adminExists =
      await Admin.findOne({
        role: "admin",
      });

    if (adminExists) {
      return res.status(403).json({
        success: false,
        message:
          "Admin already exists.",
      });
    }

    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required.",
      });
    }

    

    const admin =
      await Admin.create({
        name,
        email,
        password
      });

    return res.status(201).json({
      success: true,
      message:
        "Admin created successfully.",
      admin,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });
  }
};
import { Request, Response } from "express";
import Contact from "../models/Contact";

/**
 * Get Contact Settings
 */
export const getContact = async (
  req: Request,
  res: Response
) => {
  try {
    const contact = await Contact.findOne();

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact settings.",
    });
  }
};

/**
 * Create or Update Contact Settings
 */
export const saveContact = async (
  req: Request,
  res: Response
) => {
  try {
    let contact = await Contact.findOne();

    if (!contact) {
      contact = await Contact.create(req.body);
    } else {
      Object.assign(contact, req.body);
      await contact.save();
    }

    res.status(200).json({
      success: true,
      message: "Contact settings saved successfully.",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save contact settings.",
    });
  }
};
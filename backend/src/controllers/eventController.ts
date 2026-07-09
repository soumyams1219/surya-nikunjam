import { Request, Response } from "express";
import Event from "../models/Event";
import fs from "fs";
import path from "path";

export const getEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const events = await Event.find().sort({
      eventDate: -1,
      order: 1,
    });

    res.json({
      success: true,
      events,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events.",
    });
  }
};

export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.create({
      ...req.body,
      image: req.file
        ? `/uploads/events/${req.file.filename}`
        : "",
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create event.",
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
      });
    }

    if (req.file) {
      if (event.image) {
        const oldImage = path.join(
          __dirname,
          "../../",
          event.image
        );

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      event.image = `/uploads/events/${req.file.filename}`;
    }

    event.title = req.body.title;
    event.shortDescription =
      req.body.shortDescription;
    event.description =
      req.body.description;
    event.eventDate = req.body.eventDate;
    event.eventTime = req.body.eventTime;
    event.location = req.body.location;
    event.featured =
      req.body.featured === "true";
    event.order = Number(req.body.order);
    event.isActive =
      req.body.isActive === "true";

    await event.save();

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
      });
    }

    if (event.image) {
      const imagePath = path.join(
        __dirname,
        "../../",
        event.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await event.deleteOne();

    res.json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const toggleEventStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
      });
    }

    event.isActive = !event.isActive;

    await event.save();

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};
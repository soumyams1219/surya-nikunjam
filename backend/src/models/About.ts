import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  // Welcome Section
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeDescription: string;
  welcomeImage: string;

  // About Section
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;

  // Vision
  visionTitle: string;
  visionDescription: string;

  // Mission
  missionTitle: string;
  missionDescription: string;

  // Button
  buttonText: string;
  buttonLink: string;

  isActive: boolean;
}

const AboutSchema = new Schema(
  {
    // Welcome

    welcomeTitle: {
      type: String,
      default: "",
    },

    welcomeSubtitle: {
      type: String,
      default: "",
    },

    welcomeDescription: {
      type: String,
      default: "",
    },

    welcomeImage: {
      type: String,
      default: "",
    },

    // About

    aboutTitle: {
      type: String,
      default: "",
    },

    aboutDescription: {
      type: String,
      default: "",
    },

    aboutImage: {
      type: String,
      default: "",
    },

    // Vision

    visionTitle: {
      type: String,
      default: "Our Vision",
    },

    visionDescription: {
      type: String,
      default: "",
    },

    // Mission

    missionTitle: {
      type: String,
      default: "Our Mission",
    },

    missionDescription: {
      type: String,
      default: "",
    },

    // Button

    buttonText: {
      type: String,
      default: "Know More",
    },

    buttonLink: {
      type: String,
      default: "/about",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAbout>(
  "About",
  AboutSchema
);
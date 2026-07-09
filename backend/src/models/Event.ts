import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  eventDate: Date;
  eventTime: string;
  location: string;
  featured: boolean;
  order: number;
  isActive: boolean;
}

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    eventTime: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 1,
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

export default mongoose.model<IEvent>(
  "Event",
  eventSchema
);
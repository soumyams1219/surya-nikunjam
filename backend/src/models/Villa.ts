import mongoose, { Schema, Document } from "mongoose";

export interface IVilla extends Document {
  title: string;
  plotSize: string;
  builtUpArea: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
}

const villaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    plotSize: {
      type: String,
      required: true,
      trim: true,
    },

    builtUpArea: {
      type: String,
      required: true,
      trim: true,
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 1,
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

export default mongoose.model<IVilla>(
  "Villa",
  villaSchema
);
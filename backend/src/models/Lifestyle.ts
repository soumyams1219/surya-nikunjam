import mongoose, { Schema, Document } from "mongoose";

export interface ILifestyle extends Document {
  title: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
}

const lifestyleSchema = new Schema(
  {
    title: {
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
      default: "",
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

export default mongoose.model<ILifestyle>(
  "Lifestyle",
  lifestyleSchema
);
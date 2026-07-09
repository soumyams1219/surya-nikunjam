import mongoose, { Document, Schema } from "mongoose";

export interface IGallery extends Document {
  title: string;
  category: string;
  image: string;
  order: number;
  isActive: boolean;
}

const gallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "",
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

export default mongoose.model<IGallery>(
  "Gallery",
  gallerySchema
);
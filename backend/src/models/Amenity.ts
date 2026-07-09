import mongoose, { Document, Schema } from "mongoose";

export interface IAmenity extends Document {
  title: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
}

const amenitySchema = new Schema<IAmenity>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
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

export default mongoose.model<IAmenity>(
  "Amenity",
  amenitySchema
);
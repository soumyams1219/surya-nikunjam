import mongoose, { Schema, Document } from "mongoose";

export interface ILocationAdvantage extends Document {
  title: string;
  description: string;
  nearby: string[];
  isActive: boolean;
}

const LocationAdvantageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    nearby: [
      {
        type: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILocationAdvantage>(
  "LocationAdvantage",
  LocationAdvantageSchema
);
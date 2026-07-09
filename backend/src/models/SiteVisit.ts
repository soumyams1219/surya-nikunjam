import mongoose, { Schema, Document } from "mongoose";

export interface ISiteVisit extends Document {
  name: string;
  phone: string;
  email: string;
  visitDate: Date;
  visitTime: string;
  message?: string;
  status: "Pending" | "Contacted";
}

const siteVisitSchema = new Schema<ISiteVisit>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    visitTime: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Contacted"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISiteVisit>(
  "SiteVisit",
  siteVisitSchema
);
import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  companyName: string;
  address: string;
  phone1: string;
  phone2?: string;
  email: string;
  whatsapp?: string;
  googleMap?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  officeHours?: string;
  copyright?: string;
  isActive: boolean;
}

const contactSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    phone1: {
      type: String,
      required: true,
      trim: true,
    },

    phone2: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    whatsapp: {
      type: String,
      default: "",
      trim: true,
    },

    googleMap: {
      type: String,
      default: "",
      trim: true,
    },

    facebook: {
      type: String,
      default: "",
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    youtube: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    officeHours: {
      type: String,
      default: "",
      trim: true,
    },

    copyright: {
      type: String,
      default: "",
      trim: true,
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

export default mongoose.model<IContact>(
  "Contact",
  contactSchema
);
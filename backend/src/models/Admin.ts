import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin {
  name: string;
  email: string;
  password: string;
}

export interface IAdminMethods {
  comparePassword(password: string): Promise<boolean>;
}

type AdminModel = Model<IAdmin, {}, IAdminMethods>;

const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre("save", async function () {
  const admin = this as HydratedDocument<IAdmin>;

  if (!admin.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  admin.password = await bcrypt.hash(admin.password, salt);
});

// Compare password
adminSchema.method(
  "comparePassword",
  async function (password: string) {
    return bcrypt.compare(password, this.password);
  }
);

const Admin = mongoose.model<IAdmin, AdminModel>("Admin", adminSchema);

export default Admin;
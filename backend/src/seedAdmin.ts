import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "./models/Admin";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    // Create admin
    const admin = new Admin({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: "123456",
    });

    await admin.save();

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes";
import path from "path";
import bannerRoutes from "./routes/bannerRoutes";
import aboutRoutes from "./routes/aboutRoutes";
import amenityRoutes from "./routes/amenityRoutes";
import lifestyleRoutes from "./routes/lifestyleRoutes";
import villaRoutes from "./routes/villaRoutes";
import faqRoutes from "./routes/faqRoutes";
import contactRoutes from "./routes/contactRoutes";
import galleryRoutes from "./routes/galleryRoutes";
import eventRoutes from "./routes/eventRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import whyChooseRoutes from "./routes/whyChooseRoutes";
import siteVisitRoutes from "./routes/siteVisitRoutes";
import locationAdvantageRoutes from "./routes/locationAdvantageRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Surya Nikunjam API Running"
  });
});
app.use("/api/admin", adminRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/lifestyle",lifestyleRoutes);
app.use("/api/villas", villaRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);
app.use(
  "/api/testimonials",
  testimonialRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use("/api/why-choose", whyChooseRoutes);
app.use(
  "/api/site-visits",
  siteVisitRoutes
);
app.use(
  "/api/location-advantage",
  locationAdvantageRoutes
);

export default app;
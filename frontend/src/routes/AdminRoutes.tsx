import ProtectedRoute from "../components/admin/ProtectedRoute";

import Dashboard from "../pages/admin/Dashboard/Dashboard";

import LoginPage from "../pages/admin/Login/LoginPage";

import BannerList from "../pages/admin/Banner/BannerList";
import AddBanner from "../pages/admin/Banner/AddBanner";
import EditBanner from "../pages/admin/Banner/EditBanner";

import AboutPage from "../pages/admin/About/AboutPage";

import AmenityList from "../pages/admin/Amenities/AmenityList";
import AddAmenity from "../pages/admin/Amenities/AddAmenity";
import EditAmenity from "../pages/admin/Amenities/EditAmenity";

import LifestyleList from "../pages/admin/Lifestyle/LifestyleList";
import AddLifestyle from "../pages/admin/Lifestyle/AddLifestyle";
import EditLifestyle from "../pages/admin/Lifestyle/EditLifestyle";

import VillaList from "../pages/admin/Villa/VillaList";
import AddVilla from "../pages/admin/Villa/AddVilla";
import EditVilla from "../pages/admin/Villa/EditVilla";

import GalleryList from "../pages/admin/Gallery/GalleryList";
import AddGallery from "../pages/admin/Gallery/AddGallery";
import EditGallery from "../pages/admin/Gallery/EditGallery";

import EventList from "../pages/admin/Event/EventList";
import AddEvent from "../pages/admin/Event/AddEvent";
import EditEvent from "../pages/admin/Event/EditEvent";

import FAQList from "../pages/admin/FAQ/FAQList";
import AddFAQ from "../pages/admin/FAQ/AddFAQ";
import EditFAQ from "../pages/admin/FAQ/EditFAQ";

import ContactSettings from "../pages/admin/Contact/ContactSettings";

import TestimonialList from "../pages/admin/Testimonial/TestimonialList";
import AddTestimonial from "../pages/admin/Testimonial/AddTestimonial";
import EditTestimonial from "../pages/admin/Testimonial/EditTestimonial";

import WhyChooseList from "../pages/admin/WhyChoose/WhyChooseList";
import AddWhyChoose from "../pages/admin/WhyChoose/AddWhyChoose";
import EditWhyChoose from "../pages/admin/WhyChoose/EditWhyChoose";

import SiteVisitList from "../pages/admin/siteVisit/SiteVisitList";
import SiteVisitView from "../pages/admin/siteVisit/SiteVisitView";
import LocationAdvantagePage from "../pages/admin/LocationAdvantage/LocationAdvantagePage";

const adminRoutes = [
  {
    path: "/admin/login",
    element: <LoginPage />,
  },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/banner",
    element: (
      <ProtectedRoute>
        <BannerList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/banner/add",
    element: (
      <ProtectedRoute>
        <AddBanner />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/banner/edit/:id",
    element: (
      <ProtectedRoute>
        <EditBanner />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/about",
    element: (
      <ProtectedRoute>
        <AboutPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/amenities",
    element: (
      <ProtectedRoute>
        <AmenityList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/amenities/add",
    element: (
      <ProtectedRoute>
        <AddAmenity />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/amenities/edit/:id",
    element: (
      <ProtectedRoute>
        <EditAmenity />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/lifestyles",
    element: (
      <ProtectedRoute>
        <LifestyleList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/lifestyles/add",
    element: (
      <ProtectedRoute>
        <AddLifestyle />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/lifestyles/edit/:id",
    element: (
      <ProtectedRoute>
        <EditLifestyle />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/villas",
    element: (
      <ProtectedRoute>
        <VillaList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/villas/add",
    element: (
      <ProtectedRoute>
        <AddVilla />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/villas/edit/:id",
    element: (
      <ProtectedRoute>
        <EditVilla />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/gallery",
    element: (
      <ProtectedRoute>
        <GalleryList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/gallery/add",
    element: (
      <ProtectedRoute>
        <AddGallery />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/gallery/edit/:id",
    element: (
      <ProtectedRoute>
        <EditGallery />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/events",
    element: (
      <ProtectedRoute>
        <EventList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/events/add",
    element: (
      <ProtectedRoute>
        <AddEvent />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/events/edit/:id",
    element: (
      <ProtectedRoute>
        <EditEvent />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/faqs",
    element: (
      <ProtectedRoute>
        <FAQList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/faqs/add",
    element: (
      <ProtectedRoute>
        <AddFAQ />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/faqs/edit/:id",
    element: (
      <ProtectedRoute>
        <EditFAQ />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/contact",
    element: (
      <ProtectedRoute>
        <ContactSettings />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/testimonials",
    element: (
      <ProtectedRoute>
        <TestimonialList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/testimonials/add",
    element: (
      <ProtectedRoute>
        <AddTestimonial />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/testimonials/edit/:id",
    element: (
      <ProtectedRoute>
        <EditTestimonial />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/why-choose",
    element: (
      <ProtectedRoute>
        <WhyChooseList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/why-choose/add",
    element: (
      <ProtectedRoute>
        <AddWhyChoose />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/why-choose/edit/:id",
    element: (
      <ProtectedRoute>
        <EditWhyChoose />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/site-visits",
    element: (
      <ProtectedRoute>
        <SiteVisitList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/site-visits/view/:id",
    element: (
      <ProtectedRoute>
        <SiteVisitView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/location-advantage",
    element: (
      <ProtectedRoute>
        <LocationAdvantagePage/>
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
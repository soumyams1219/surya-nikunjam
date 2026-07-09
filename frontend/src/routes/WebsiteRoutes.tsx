import WebsiteLayout from "../layouts/WebsiteLayout";

import Home from "../pages/website/Home";
import About from "../pages/website/About";
import SiteVisit from "../pages/website/SiteVisit";
import LocationAdvantages from "../pages/website/LocationAdvantages";
import Villas from "../pages/website/Villas";
import VillaDetails from "../pages/website/VillaDetails";
import Amenities from "../pages/website/Amenities";
import Lifestyles from "../pages/website/Lifestyles";
import Gallery from "../pages/website/Gallery";
import EventDetails from "../pages/website/EventDetails";
import Events from "../pages/website/Events";
import Testimonials from "../pages/website/Testimonials";
import FAQ from "../pages/website/FAQ";
import Contact from "../pages/website/Contact";
import WhyChoose from "../pages/website/WhyChoose";


const websiteRoutes = [
  {
    element: <WebsiteLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/site-visit",
        element: <SiteVisit />,
      },
      {
        path: "/location-advantages",
        element: <LocationAdvantages />,
      },
       {
        path: "/villas",
        element: <Villas />,
      },
       {
        path: "/villas/:id",
        element: <VillaDetails />,
      },
       {
        path: "/amenities",
        element: <Amenities />,
      },
      {
        path: "/lifestyles",
        element: <Lifestyles />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
       {
        path: "/why-choose",
        element: <WhyChoose />,
      },
    ],
  },
];

export default websiteRoutes;
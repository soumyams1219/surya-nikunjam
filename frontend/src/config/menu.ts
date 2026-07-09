import {
  FaHome,
  FaImage,
  FaInfoCircle,
  FaSwimmingPool,
  FaLeaf,
  FaHome as FaVilla,
  FaImages,
  FaCalendarAlt,
  FaCalendarCheck,
  FaQuestionCircle,
  FaAddressBook,
  FaCommentDots,
  FaMapMarkedAlt, 
} from "react-icons/fa";

import type { IconType } from "react-icons";

export interface MenuItem {
  name: string;
  path: string;
  icon: IconType;
}

export const adminMenus: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: FaHome,
  },
  {
    name: "Banner",
    path: "/admin/banner",
    icon: FaImage,
  },
  {
    name: "About",
    path: "/admin/about",
    icon: FaInfoCircle,
  },
  {
  name: "Location Advantages",
  path: "/admin/location-advantage",
  icon: FaMapMarkedAlt,
},
  {
    name: "Why Choose",
    path: "/admin/why-choose",
    icon: FaInfoCircle,
  },
  {
    name: "Amenities",
    path: "/admin/amenities",
    icon: FaSwimmingPool,
  },
  {
    name: "Lifestyles",
    path: "/admin/lifestyles",
    icon: FaLeaf,
  },
  {
    name: "Villa Options",
    path: "/admin/villas",
    icon: FaVilla,
  },
  {
    name: "Gallery",
    path: "/admin/gallery",
    icon: FaImages,
  },
  {
    name: "Events",
    path: "/admin/events",
    icon: FaCalendarAlt,
  },
 {
  name: "Site Visits",
  path: "/admin/site-visits",
  icon: FaCalendarCheck,
},
  {
    name: "Testimonials",
    path: "/admin/testimonials",
    icon: FaCommentDots,
  },
  {
    name: "FAQ Management",
    path: "/admin/faqs",
    icon: FaQuestionCircle,
  },
  {
    name: "Contact Settings",
    path: "/admin/contact",
    icon: FaAddressBook,
  },
];
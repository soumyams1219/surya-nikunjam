import { Outlet } from "react-router-dom";

import Navbar from "../components/website/navbar/Navbar";
import Footer from "../components/website/footer/Footer";
import ScrollToTop from "../components/website/navbar/ScrollToTop";
import ScrollToTopOnRouteChange from "../components/website/navbar/ScrollToTopOnRouteChange";

export default function WebsiteLayout() {
  return (
    <>
      <ScrollToTopOnRouteChange />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <ScrollToTop />
    </>
  );
}
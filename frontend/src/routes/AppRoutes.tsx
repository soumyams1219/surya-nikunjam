import { BrowserRouter, useRoutes } from "react-router-dom";

import websiteRoutes from "./WebsiteRoutes";
import adminRoutes from "./AdminRoutes";

function Router() {
  return useRoutes([
    ...websiteRoutes,
    ...adminRoutes,
  ]);
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
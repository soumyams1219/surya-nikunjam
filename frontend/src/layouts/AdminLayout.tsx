import type { ReactNode } from "react";

import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import AboutForm from "../../../components/admin/about/AboutForm";

import {
  getAbout,
  saveAbout,
} from "../../../services/aboutService";

import type { About } from "../../../types/about";

export default function AboutPage() {
  const [about, setAbout] = useState<About>();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      setPageLoading(true);

      const response = await getAbout();

      if (response.success) {
        setAbout(response.about);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load About information",
      });
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      const response =
        await saveAbout(formData);

      Swal.fire({
        icon: "success",
        title: response.message,
        timer: 1500,
        showConfirmButton: false,
      });

      setAbout(response.about);

      await loadAbout();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-500">
            Loading About Information...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">
            About Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage the Welcome,
            About, Vision, Mission,
            and Button content shown
            on the website.
          </p>

        </div>

        {/* Form */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <AboutForm
            initialData={about}
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>

      </div>
    </AdminLayout>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import LifestyleForm from "../../../components/admin/lifestyle/LifestyleForm";

import {
  getLifestyle,
  updateLifestyle,
} from "../../../services/lifestyleService";

import type { Lifestyle } from "../../../types/lifestyle";

export default function EditLifestyle() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [Lifestyle, setLifestyle] =
    useState<Lifestyle>();

  useEffect(() => {
    if (id) {
      loadLifestyle(id);
    }
  }, [id]);

  const loadLifestyle = async (
    LifestyleId: string
  ) => {
    try {
      setPageLoading(true);

      const response =
        await getLifestyle(LifestyleId);

      if (response.success) {
        setLifestyle(response.lifestyle);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load Lifestyle",
      });

      navigate("/admin/lifestyles");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (
    formData: FormData
  ) => {
    if (!id) return;

    try {
      setLoading(true);

      const response =
        await updateLifestyle(id, formData);

      Swal.fire({
        icon: "success",
        title:
          response.message ||
          "Lifestyle updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/lifestyles");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Failed to update Lifestyle.",
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
            Loading Lifestyle...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        {/* Header */}

        <div className="mb-8 border-b pb-4">

          <h1 className="text-3xl font-bold text-gray-800">
            Edit Lifestyle
          </h1>

          <p className="text-gray-500 mt-2">
            Update community Lifestyle information.
          </p>

        </div>

        <LifestyleForm
          initialData={Lifestyle}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Update Lifestyle"
        />

      </div>
    </AdminLayout>
  );
}
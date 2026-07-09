import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import LifestyleForm from "../../../components/admin/lifestyle/LifestyleForm";

import { createLifestyle } from "../../../services/lifestyleService";

export default function AddLifestyle() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      const response = await createLifestyle(
        formData
      );

      Swal.fire({
        icon: "success",
        title:
          response.message ||
          "Lifestyle created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/lifestyles");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Failed to create Lifestyle.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        {/* Header */}

        <div className="mb-8 border-b pb-4">

          <h1 className="text-3xl font-bold text-gray-800">
            Add Lifestyle
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new community Lifestyle.
          </p>

        </div>

        <LifestyleForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Create Lifestyle"
        />

      </div>
    </AdminLayout>
  );
}
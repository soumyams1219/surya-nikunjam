import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import VillaForm from "../../../components/admin/villa/VillaForm";

import { createVilla } from "../../../services/villaService";

export default function AddVilla() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      const response = await createVilla(formData);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Villa Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/villas");
      } else {
        Swal.fire({
          icon: "error",
          title: response.message || "Failed to add villa",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error?.response?.data?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Add Villa
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new villa option
          </p>
        </div>

        <VillaForm
          loading={loading}
          submitText="Add Villa"
          onSubmit={handleSubmit}
        />

      </div>
    </AdminLayout>
  );
}
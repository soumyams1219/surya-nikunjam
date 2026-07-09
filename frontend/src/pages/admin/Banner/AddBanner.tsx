import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import BannerForm from "../../../components/admin/banner/BannerForm";
import { createBanner } from "../../../services/bannerService";

export default function AddBanner() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      await createBanner(formData);

      Swal.fire({
        icon: "success",
        title: "Banner Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/banner");
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to create banner",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-8">
          Add Banner
        </h1>

      <BannerForm
  onSubmit={handleSubmit}
  loading={loading}
  submitText="Save Banner"
/>
      </div>
    </AdminLayout>
  );
}
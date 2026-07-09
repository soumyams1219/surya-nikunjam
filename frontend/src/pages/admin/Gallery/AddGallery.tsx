import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import GalleryForm from "../../../components/admin/gallery/GalleryForm";

import { createGallery } from "../../../services/galleryService";

export default function AddGallery() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      const response = await createGallery(
        formData
      );

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Gallery image added successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/gallery");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to add gallery image",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Gallery Image
        </h1>

        <GalleryForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Save Gallery"
        />

      </div>
    </AdminLayout>
  );
}
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import GalleryForm from "../../../components/admin/gallery/GalleryForm";

import {
  getGalleryById,
  updateGallery,
} from "../../../services/galleryService";

import type { Gallery } from "../../../types/gallery";

export default function EditGallery() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [gallery, setGallery] =
    useState<Gallery>();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setPageLoading(true);

      const response =
        await getGalleryById(id!);

      if (response.success) {
        setGallery(response.gallery);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load gallery image",
      });

      navigate("/admin/gallery");
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
        await updateGallery(
          id!,
          formData
        );

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Gallery updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/gallery");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update failed",
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
            Loading Gallery...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Gallery Image
        </h1>

        {gallery && (
          <GalleryForm
            initialData={gallery}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Update Gallery"
          />
        )}

      </div>
    </AdminLayout>
  );
}
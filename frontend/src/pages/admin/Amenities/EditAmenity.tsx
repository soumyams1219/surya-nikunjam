import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import AmenityForm from "../../../components/admin/amenity/AmenityForm";

import {
  getAmenity,
  updateAmenity,
} from "../../../services/amenityService";

import type { Amenity } from "../../../types/amenity";

export default function EditAmenity() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [amenity, setAmenity] =
    useState<Amenity>();

  useEffect(() => {
    if (id) {
      loadAmenity(id);
    }
  }, [id]);

  const loadAmenity = async (
    amenityId: string
  ) => {
    try {
      setPageLoading(true);

      const response =
        await getAmenity(amenityId);

      if (response.success) {
        setAmenity(response.amenity);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load amenity",
      });

      navigate("/admin/amenities");
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
        await updateAmenity(id, formData);

      Swal.fire({
        icon: "success",
        title:
          response.message ||
          "Amenity updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/amenities");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Failed to update amenity.",
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
            Loading Amenity...
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
            Edit Amenity
          </h1>

          <p className="text-gray-500 mt-2">
            Update community amenity information.
          </p>

        </div>

        <AmenityForm
          initialData={amenity}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Update Amenity"
        />

      </div>
    </AdminLayout>
  );
}
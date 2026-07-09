import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import BannerForm from "../../../components/admin/banner/BannerForm";

import {
  getBannerById,
  updateBanner,
} from "../../../services/bannerService";

import type { Banner } from "../../../types/banner";

export default function EditBanner() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [banner, setBanner] = useState<Banner>();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadBanner();
  }, []);

  const loadBanner = async () => {
    try {
      const response = await getBannerById(id!);

      setBanner(response.banner);
    } catch (error) {
      Swal.fire(
        "Error",
        "Unable to load banner",
        "error"
      );

      navigate("/admin/banner");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setLoading(true);

      await updateBanner(id!, formData);

      Swal.fire({
        icon: "success",
        title: "Banner Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/banner");
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to update banner",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-10">
          Loading Banner...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Banner
        </h1>

        {banner && (
          <BannerForm
  initialData={banner}
  onSubmit={handleSubmit}
  loading={loading}
  submitText="Update Banner"
/>
        )}

      </div>
    </AdminLayout>
  );
}
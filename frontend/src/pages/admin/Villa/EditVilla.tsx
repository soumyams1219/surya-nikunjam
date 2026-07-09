import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import VillaForm from "../../../components/admin/villa/VillaForm";

import {
  getVilla,
  updateVilla,
} from "../../../services/villaService";

import type { Villa } from "../../../types/villa";

export default function EditVilla() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [villa, setVilla] =
    useState<Villa>();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadVilla();
  }, []);

  const loadVilla = async () => {
    try {
      const response = await getVilla(id!);

      if (response.success) {
        setVilla(response.villa);
      } else {
        Swal.fire({
          icon: "error",
          title: "Villa not found",
        });

        navigate("/admin/villas");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load villa",
      });

      navigate("/admin/villas");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    formData: FormData
  ) => {
    try {
      setSaving(true);

      const response = await updateVilla(
        id!,
        formData
      );

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Villa Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/villas");
      } else {
        Swal.fire({
          icon: "error",
          title:
            response.message ||
            "Update failed",
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
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Edit Villa
          </h1>

          <p className="text-gray-500 mt-2">
            Update villa details
          </p>

        </div>

        {villa && (
          <VillaForm
            initialData={villa}
            loading={saving}
            submitText="Update Villa"
            onSubmit={handleSubmit}
          />
        )}

      </div>
    </AdminLayout>
  );
}
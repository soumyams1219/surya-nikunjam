import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import WhyChooseForm from "../../../components/admin/whyChoose/WhyChooseForm";

import {
  getWhyChooseById,
  updateWhyChoose,
} from "../../../services/whyChooseService";

import type { WhyChoose } from "../../../types/whyChoose";

export default function EditWhyChoose() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [item, setItem] = useState<WhyChoose>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const response = await getWhyChooseById(id!);

      if (response.success) {
        setItem(response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Item not found",
        });

        navigate("/admin/why-choose");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load item",
      });

      navigate("/admin/why-choose");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      setSaving(true);

      const response = await updateWhyChoose(
        id!,
        formData
      );

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/why-choose");
      } else {
        Swal.fire({
          icon: "error",
          title:
            response.message || "Update failed",
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Edit Why Choose
          </h1>

          <p className="text-gray-500 mt-2">
            Update Why Choose details
          </p>
        </div>

        {/* Form */}
        {item && (
          <WhyChooseForm
            initialData={item}
            loading={saving}
            submitText="Update"
            onSubmit={handleSubmit}
          />
        )}

      </div>
    </AdminLayout>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import WhyChooseForm from "../../../components/admin/whyChoose/WhyChooseForm";

import { createWhyChoose } from "../../../services/whyChooseService";

export default function AddWhyChoose() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);

      const response = await createWhyChoose(formData);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Item Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/why-choose");
      } else {
        Swal.fire({
          icon: "error",
          title:
            response.message || "Failed to add item",
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Add Why Choose
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new Why Choose item
          </p>
        </div>

        {/* Form */}
        <WhyChooseForm
          loading={loading}
          submitText="Add Item"
          onSubmit={handleSubmit}
        />

      </div>
    </AdminLayout>
  );
}